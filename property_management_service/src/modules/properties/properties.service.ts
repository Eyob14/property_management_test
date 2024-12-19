import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  PropertiesDocument,
  PropertiesModel,
} from 'src/models/properties.model';
import { Model } from 'mongoose';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(PropertiesModel.name)
    private propertiesModel: Model<PropertiesDocument>,
    // private readonly logger: CustomLoggerService,
  ) {}
}
