import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PropertiesModel, PropertiesSchema } from 'src/models/properties.model';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { TenanciesModel, TenanciesSchema } from 'src/models/tenancies.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PropertiesModel.name, schema: PropertiesSchema },
      { name: TenanciesModel.name, schema: TenanciesSchema },
    ]),
    // LoggerModule,
  ],

  providers: [PropertiesService],

  controllers: [PropertiesController],

  exports: [],
})
export class PropertiesModule {}
