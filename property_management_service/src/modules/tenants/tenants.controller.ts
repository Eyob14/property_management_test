import {
  //   Body,
  Controller,
  //   Delete,
  Get,
  Param,
  //   Post,
  //   Put,
  //   Query,
} from '@nestjs/common';
import { TenantsService } from './tenants.service';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Get('/dashboard/:tenantId')
  async getTenantDashboard(@Param('tenantId') tenantId: string): Promise<any> {
    return await this.tenantsService.getTenantDashboard(tenantId);
  }
}
