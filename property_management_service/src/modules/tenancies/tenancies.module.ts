import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TenanciesModel, TenanciesSchema } from 'src/models/tenancies.model';
import { TenanciesService } from './tenancies.service';
import { TenanciesController } from './tenancies.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TenanciesModel.name, schema: TenanciesSchema },
    ]),
    // LoggerModule,
  ],

  providers: [TenanciesService],

  controllers: [TenanciesController],

  exports: [],
})
export class TenanciesModule {}
