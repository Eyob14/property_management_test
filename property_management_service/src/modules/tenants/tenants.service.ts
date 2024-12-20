import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TenantsDocument, TenantsModel } from 'src/models/tenants.model';
import { Model, PipelineStage, Types } from 'mongoose';
import { CustomHttpException } from 'src/utils/custom_error_class';

@Injectable()
export class TenantsService {
  constructor(
    @InjectModel(TenantsModel.name)
    private tenantsModel: Model<TenantsDocument>,
  ) {}
  async getTenantDashboard(tenantId: string) {
    try {
      const matchStage: PipelineStage.Match = {
        $match: { _id: new Types.ObjectId(tenantId) },
      };

      const pipeline: PipelineStage[] = [matchStage];

      // Lookup and count properties
      pipeline.push({
        $lookup: {
          from: 'properties',
          let: { tenantId: { $toString: '$_id' } },
          pipeline: [
            { $match: { $expr: { $eq: ['$tenantId', '$$tenantId'] } } },
            { $match: { isDeleted: { $ne: true } } },
            {
              $lookup: {
                from: 'jobs',
                let: { propertyId: { $toString: '$_id' } },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $ne: ['$$propertyId', ''] }, // Skip if propertyId is an empty string
                          {
                            $eq: [{ $toString: '$propertyId' }, '$$propertyId'],
                          },
                        ],
                      },
                    },
                  },
                  { $match: { isDeleted: { $ne: true } } },
                  {
                    $group: {
                      _id: '$status',
                      count: { $sum: 1 },
                    },
                  },
                ],
                as: 'maintenanceJobStatus',
              },
            },
          ],
          as: 'properties',
        },
      });

      // Add total properties count
      pipeline.push({
        $addFields: {
          totalProperties: { $size: '$properties' }, // Count total properties
        },
      });

      // Lookup and count active tenancies
      pipeline.push({
        $lookup: {
          from: 'tenancies',
          let: { tenantId: { $toString: '$_id' } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$tenantId', '$$tenantId'] },
              },
            },
            { $match: { status: 'ACTIVE', isDeleted: { $ne: true } } },
          ],
          as: 'activeTenancies',
        },
      });

      // Add total active tenancies count
      pipeline.push({
        $addFields: {
          totalActiveTenancies: { $size: '$activeTenancies' }, // Count total active tenancies
        },
      });

      // Lookup and group users by user type
      pipeline.push({
        $lookup: {
          from: 'users',
          let: { tenantId: { $toString: '$_id' } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$tenantId', '$$tenantId'] },
              },
            },
            { $match: { isDeleted: { $ne: true } } },
            {
              $group: {
                _id: '$userType',
                count: { $sum: 1 },
              },
            },
          ],
          as: 'usersByType',
        },
      });

      // Final projection to include the aggregated data and maintenanceJobStatus
      pipeline.push({
        $project: {
          _id: 1,
          name: 1,
          domain: 1,
          totalProperties: 1,
          totalActiveTenancies: 1,
          usersByType: 1,
          properties: {
            _id: 1,
            name: 1,
            maintenanceJobStatus: 1, // Include maintenanceJobStatus in the properties array
          },
        },
      });

      // Execute the aggregation
      const result = await this.tenantsModel.aggregate(pipeline).exec();

      return result;
    } catch (error) {
      if (error instanceof CustomHttpException) {
        throw error;
      }
      const errorMsg = error.message ?? 'An unexpected error occurred';
      throw CustomHttpException.internalServerError(
        `Failed to get tenant dashboard data: ${errorMsg}`,
      );
    }
  }
}
