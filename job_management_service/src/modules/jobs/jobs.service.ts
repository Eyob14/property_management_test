import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JobsDocument, JobsModel } from 'src/models/jobs.model';
import { Model } from 'mongoose';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(JobsModel.name)
    private JobsModel: Model<JobsDocument>,
    // private readonly logger: CustomLoggerService,
  ) {}
}
