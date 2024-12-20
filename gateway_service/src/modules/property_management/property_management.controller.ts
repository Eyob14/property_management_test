import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { PropertyManagementService } from './property_management.service';
import { UserRoles, UserTokenPayload } from 'src/utils/constants';

@Controller('properties')
export class PropertyManagementController {
  constructor(private readonly propertiesService: PropertyManagementService) {}

  @Get('welcome')
  async getWelcomePage() {
    return await this.propertiesService.welcomePage();
  }

  @Get('tenants/dashboard')
  async getTenantDashboard(
    @Req() req: UserTokenPayload,
    @Query('tenantId') tenantId: string,
  ) {
    return await this.propertiesService.getTenantDashboard(tenantId);
  }

  @Get('search/:tenantId')
  async getPropertiesSearch(
    @Req() req: UserTokenPayload,
    @Param('tenantId') tenantId: string,
    @Query('name') name: string,
    @Query('address') address: string,
    @Query('assignedUser') userId: string,
  ) {
    const queryData = {
      tenantId,
      name: name || '',
      address: address || '',
      assigned_user: userId,
      // user_id: req.user.name,
      // user_role: UserRoles[req.user.sub],
    };
    return await this.propertiesService.getPropertiesSearch(queryData);
  }
}
