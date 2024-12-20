import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JobsDocument, JobsModel } from 'src/models/jobs.model';
import { Model } from 'mongoose';
import { CustomHttpException } from 'src/utils/custom_error_class';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(JobsModel.name)
    private JobsModel: Model<JobsDocument>,
  ) {}

  async assignMaintenanceJob(payload: any) {
    return payload;
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

      const jobs = await this.JobsModel.aggregate(pipeline);

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
