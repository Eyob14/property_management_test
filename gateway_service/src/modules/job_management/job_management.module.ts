import { Module } from '@nestjs/common';
import { JobManagementService } from './job_management.service';
import { JobManagementController } from './job_management.controller';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// import { AuthorizationModule } from 'src/core/modules/authorization/authorization.module';
import { AxiosModule } from 'src/core/modules/axios/axios.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    AxiosModule,
    // AuthorizationModule,
    ClientsModule.register([
      {
        name: 'JOB_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'job',
            brokers: [process.env.BROKER_URI],
          },
          consumer: {
            groupId: 'job-consumer',
          },
        },
      },
    ]),
  ],
  providers: [JobManagementService],
  controllers: [JobManagementController],
  exports: [JobManagementService],
})
export class JobManagementModule {}
