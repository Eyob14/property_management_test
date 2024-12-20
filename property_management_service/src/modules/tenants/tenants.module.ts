import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { TenantsModel, TenantsSchema } from 'src/models/tenants.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TenantsModel.name, schema: TenantsSchema },
    ]),
    // LoggerModule,
  ],

  providers: [TenantsService],

  controllers: [TenantsController],

  exports: [],
})
export class TenantsModule {}
