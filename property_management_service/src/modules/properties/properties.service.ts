import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  PropertiesDocument,
  PropertiesModel,
} from 'src/models/properties.model';
import { Model } from 'mongoose';
import { TenanciesDocument, TenanciesModel } from 'src/models/tenancies.model';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(PropertiesModel.name)
    private propertiesModel: Model<PropertiesDocument>,
    @InjectModel(TenanciesModel.name)
    private tenanciesModel: Model<TenanciesDocument>,
    // private readonly logger: CustomLoggerService,
  ) {}

  public async getPropertiesSearch(queryData: any = {}) {
    return queryData;
  }
}
