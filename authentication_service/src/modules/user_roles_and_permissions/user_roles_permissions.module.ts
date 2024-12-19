import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersRolesPermissionsService } from './user_roles_permissions.service';
import { UsersRolesPermissionsController } from './user_roles_permissions.controller';
import { RolesModel, RolesSchema } from 'src/models/role.model';
import { UserRolesModel, userRolesSchema } from 'src/models/user_roles.model';
import {
  UserPermissionsModel,
  UserPermissionsSchema,
} from 'src/models/user_permissions.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserPermissionsModel.name, schema: UserPermissionsSchema },
      { name: UserRolesModel.name, schema: userRolesSchema },
      { name: RolesModel.name, schema: RolesSchema },
    ]),
  ],
  providers: [UsersRolesPermissionsService],
  controllers: [UsersRolesPermissionsController],
  exports: [UsersRolesPermissionsService],
})
export class UsersRolesPermissionsModule {}
