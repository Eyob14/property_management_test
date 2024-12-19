import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModel, UsersSchema } from 'src/models/users.model';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RolesModel, RolesSchema } from 'src/models/role.model';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  UserPermissionsModel,
  UserPermissionsSchema,
} from 'src/models/user_permissions.model';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './jwt_local_strategy';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: UsersModel.name, schema: UsersSchema },
      { name: RolesModel.name, schema: RolesSchema },
      { name: UserPermissionsModel.name, schema: UserPermissionsSchema },
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

  providers: [AuthService, LocalStrategy],

  controllers: [AuthController],

  exports: [],
})
export class AuthModule {}
