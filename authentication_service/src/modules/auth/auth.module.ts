import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModel, UsersSchema } from 'src/models/users.model';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RolesModel, RolesSchema } from 'src/models/role.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UsersModel.name, schema: UsersSchema },
      { name: RolesModel.name, schema: RolesSchema },
    ]),
    // LoggerModule,
  ],

  providers: [AuthService],

  controllers: [AuthController],

  exports: [],
})
export class AuthModule {}
