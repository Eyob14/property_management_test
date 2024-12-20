import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  PropertiesDocument,
  PropertiesModel,
} from 'src/models/properties.model';
import { Model } from 'mongoose';
import { TenanciesDocument, TenanciesModel } from 'src/models/tenancies.model';
import { CustomHttpException } from 'src/utils/custom_error_class';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(PropertiesModel.name)
    private propertiesModel: Model<PropertiesDocument>,
    @InjectModel(TenanciesModel.name)
    private tenanciesModel: Model<TenanciesDocument>,
  ) {}

  public async getPropertiesSearch(queryData: any = {}) {
    try {
      const matchStage: any = {
        $match: { tenantId: queryData.tenantId },
      };

      if (queryData.name) {
        matchStage.$match.$text = { $search: queryData.name };
      }

      if (queryData.address) {
        matchStage.$match['address.city'] = {
          $regex: queryData.address,
          $options: 'i',
        };
        matchStage.$match['address.country'] = {
          $regex: queryData.address,
          $options: 'i',
        };
      }

      const pipeline = [matchStage];

      pipeline.push({
        $lookup: {
          from: 'tenancies',
          let: { propertyId: { $toString: '$_id' } },
          pipeline: [
            { $match: { $expr: { $eq: ['$propertyId', '$$propertyId'] } } },
            { $match: { isDeleted: { $ne: true } } },
            {
              $lookup: {
                from: 'users',
                let: { userId: { $toString: '$userId' } },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $ne: ['$$userId', ''] },
                          { $eq: [{ $toString: '$_id' }, '$$userId'] },
                        ],
                      },
                    },
                  },
                  { $match: { isDeleted: { $ne: true } } },
                ],
                as: 'assignedUser',
              },
            },
          ],
          as: 'tenancies',
        },
      });

      // Execute the aggregation
      const result = await this.propertiesModel.aggregate(pipeline).exec();

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
