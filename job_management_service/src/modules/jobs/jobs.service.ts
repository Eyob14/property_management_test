import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JobsDocument, JobsModel } from 'src/models/jobs.model';
import { Model } from 'mongoose';
import { CustomHttpException } from 'src/utils/custom_error_class';
import { IAssignContractor } from 'src/utils/job_types';
import {
  JobHistoriesDocument,
  JobHistoriesModel,
} from 'src/models/job_histories.model';
import { UsersDocument, UsersModel } from 'src/models/users.model';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(JobsModel.name)
    private jobsModel: Model<JobsDocument>,
    @InjectModel(JobHistoriesModel.name)
    private jobHistoryModel: Model<JobHistoriesDocument>,
    @InjectModel(UsersModel.name)
    private userModel: Model<UsersDocument>,
  ) {}

  async assignMaintenanceJob(payload: IAssignContractor) {
    try {
      // - Validate that the user is part of the tenant’s team.
      const user = await this.userModel.findOne({
        tenantId: payload.tenantId,
        _id: payload.assignedTo,
      });

      if (!user) {
        throw CustomHttpException.notFound('Contractor not found');
      }

      // - Check that the property belongs to the tenant and the job is not yet started.
      const jobToAssign = await this.jobsModel.findOne({
        _id: payload.jobId,
        propertyId: payload.propertyId,
        tenantId: payload.tenantId,
        status: 'NOT_STARTED',
      });

      if (!jobToAssign) {
        throw CustomHttpException.notFound('Job not found or already started');
      }

      // - Assign the job to the contractor and update status to 'IN_PROGRESS'.
      const updatedJob = await this.jobsModel.findByIdAndUpdate(
        jobToAssign._id,
        { assignedTo: payload.assignedTo, status: 'IN_PROGRESS' },
        { new: true }, // Ensure the updated job is returned
      );

      if (!updatedJob) {
        throw CustomHttpException.internalServerError('Failed to update job');
      }

      // - Log the assignment in a separate `JobHistory` collection.
      const jobHistoryEntry = new this.jobHistoryModel({
        propertyId: payload.propertyId,
        jobId: updatedJob._id,
        description: 'Job assigned to contractor',
      });

      await jobHistoryEntry.save();

      return {
        jobId: updatedJob._id,
        assignedTo: updatedJob.assignedTo,
        assignedUser: `${user.firstName} ${user.lastName}`,
        status: updatedJob.status,
      };
    } catch (error) {
      if (error instanceof CustomHttpException) {
        throw error;
      }
      throw CustomHttpException.internalServerError(
        'An unexpected error occurred while assigning the job',
      );
    }
  }

  public async getJobsByStatus(queryData: any = {}) {
    try {
      const matchStage: any = {
        $match: { tenantId: queryData.tenantId },
      };

      const pipeline = [matchStage];

      pipeline.push({
        $lookup: {
          from: 'users',
          let: { assignedTo: { $toObjectId: '$assignedTo' } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$assignedTo'] },
              },
            },
            { $match: { isDeleted: { $ne: true } } },
          ],
          as: 'assignedUser',
        },
      });

      pipeline.push({
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          jobs: { $push: '$$ROOT' },
        },
      });

      const jobs = await this.jobsModel.aggregate(pipeline);

      return jobs;
    } catch (error) {
      if (error instanceof CustomHttpException) {
        throw error;
      }
      const errorMsg = error.message ?? 'An unexpected error occurred';
      throw CustomHttpException.internalServerError(
        `Failed to get jobs by status: ${errorMsg}`,
      );
    }
  }
}
