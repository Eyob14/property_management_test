import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TenanciesDocument, TenanciesModel } from 'src/models/tenancies.model';
import { Model } from 'mongoose';

@Injectable()
export class TenanciesService {
  constructor(
    @InjectModel(TenanciesModel.name)
    private tenanciesModel: Model<TenanciesDocument>,
    // private readonly logger: CustomLoggerService,
  ) {}
}
