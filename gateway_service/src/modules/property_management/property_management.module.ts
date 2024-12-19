import { Module } from '@nestjs/common';
import { PropertyManagementService } from './property_management.service';
import { PropertyManagementController } from './property_management.controller';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// import { AuthorizationModule } from 'src/core/modules/authorization/authorization.module';
import { AxiosModule } from 'src/core/modules/axios/axios.module';

@Module({
  imports: [
    AxiosModule,
    // AuthorizationModule,
    // ClientsModule.register([
    //   {
    //     name: 'PROPERTY_SERVICE',
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         clientId: 'property',
    //         brokers: [process.env.BROKER_URI],
    //       },
    //       consumer: {
    //         groupId: 'property-consumer',
    //       },
    //     },
    //   },
    // ]),
  ],
  providers: [PropertyManagementService],
  controllers: [PropertyManagementController],
  exports: [PropertyManagementService],
})
export class PropertyManagementModule {}
