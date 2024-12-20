import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsModel, JobsSchema } from 'src/models/jobs.model';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import {
  JobHistoriesModel,
  JobHistoriesSchema,
} from 'src/models/job_histories.model';
import { UsersModel, UsersSchema } from 'src/models/users.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobsModel.name, schema: JobsSchema },
      { name: JobHistoriesModel.name, schema: JobHistoriesSchema },
      { name: UsersModel.name, schema: UsersSchema },
    ]),
  ],

  providers: [JobsService],

  controllers: [JobsController],

  exports: [],
})
export class JobsModule {}
