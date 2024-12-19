import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersRolesPermissionsService } from './user_roles_permissions.service';
import { UserRolesInterface } from 'src/models/user_roles.model';
import { UserPermissionsInterface } from 'src/models/user_permissions.model';

@Controller()
export class UsersRolesPermissionsController {
  constructor(
    private readonly usersRolesPermService: UsersRolesPermissionsService,
  ) {}

  @Post('roles')
  async createUserRole(@Body() payload: UserRolesInterface) {
    return await this.usersRolesPermService.createUsersRole(payload);
  }

  @Get('roles')
  async getUserRole(@Query('role_id') role_id: number) {
    const roleId = !isNaN(role_id) ? role_id : undefined;
    return await this.usersRolesPermService.getUsersRoleData(roleId);
  }

  @Delete('/roles/:id')
  async deleteUserRole(@Param('id') roleId: string) {
    return await this.usersRolesPermService.deleteUsersRole(parseInt(roleId));
  }

  @Post('permissions')
  async createUserPermission(@Body() payload: UserPermissionsInterface) {
    return await this.usersRolesPermService.createUserPermissions(payload);
  }

  @Put('permissions')
  async updateUserPermission(
    @Body() payload: Partial<UserPermissionsInterface>,
  ) {
    return await this.usersRolesPermService.updateUsersPermissionData(payload);
  }

  @Get('permissions')
  async getUserPermission(@Query('permission_id') permission_id?: string) {
    const validPermissionId = permission_id === '' ? undefined : permission_id;
    return await this.usersRolesPermService.getUsersPermissionData(
      validPermissionId,
    );
  }

  @Delete('/permissions/:id')
  async deleteUserPermission(@Param('permission_id') permission_id: string) {
    return await this.usersRolesPermService.deleteUsersPermission(
      permission_id,
    );
  }
}
