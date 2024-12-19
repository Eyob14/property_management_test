import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModel, UsersSchema } from 'src/models/users.model';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RolesModel, RolesSchema } from 'src/models/role.model';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UsersModel.name, schema: UsersSchema },
      { name: RolesModel.name, schema: RolesSchema },
    ]),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'authentication',
            brokers: [process.env.BROKER_INTERNAL_URI],
          },
          consumer: {
            groupId: 'auth-consumer-9405',
          },
        },
      },
    ]),
  ],

  providers: [AuthService],

  controllers: [AuthController],

  exports: [],
})
export class AuthModule {}
