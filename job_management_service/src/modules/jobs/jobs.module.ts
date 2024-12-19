import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsModel, JobsSchema } from 'src/models/Jobs.model';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import {
  JobHistoriesModel,
  JobHistoriesSchema,
} from 'src/models/job_histories.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobsModel.name, schema: JobsSchema },
      { name: JobHistoriesModel.name, schema: JobHistoriesSchema },
    ]),
    // LoggerModule,
  ],

  providers: [JobsService],

  controllers: [JobsController],

  exports: [],
})
export class JobsModule {}
