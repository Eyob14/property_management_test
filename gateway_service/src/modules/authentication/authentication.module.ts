import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
// import { AuthorizationModule } from 'src/core/modules/authorization/authorization.module';
import { AxiosModule } from 'src/core/modules/axios/axios.module';

@Module({
  imports: [
    AxiosModule,
    // AuthorizationModule,
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'authentication',
            brokers: [process.env.BROKER_URI],
          },
          consumer: {
            groupId: 'auth-consumer-1049',
          },
        },
      },
    ]),
  ],
  providers: [AuthenticationService],
  controllers: [AuthenticationController],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
