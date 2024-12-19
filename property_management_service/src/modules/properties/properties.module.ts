import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PropertiesModel, PropertiesSchema } from 'src/models/properties.model';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PropertiesModel.name, schema: PropertiesSchema },
    ]),
    // LoggerModule,
  ],

  providers: [PropertiesService],

  controllers: [PropertiesController],

  exports: [],
})
export class PropertiesModule {}
