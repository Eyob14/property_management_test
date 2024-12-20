import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JobManagementService } from './job_management.service';
import { UserTokenPayload } from 'src/utils/constants';
import { IsUserAuthorized } from 'src/core/guards/isAuthorized.guard';

@Controller('jobs')
export class JobManagementController {
  constructor(private readonly jobService: JobManagementService) {}

  @Get('welcome')
  async getWelcomePage() {
    return await this.jobService.welcomePage();
  }

  // @UseGuards(IsUserAuthorized)
  @Post('assign')
  async assignMaintenanceJob(
    @Req() req: UserTokenPayload,
    @Body() payload: any,
  ) {
    return await this.jobService.assignMaintenanceJob(
      payload,
      // req.user.name,
      // UserRoles[req.user.sub],
    );
  }

  @Get('status/:tenantId')
  async getJobsByStatus(
    @Req() req: UserTokenPayload,
    @Param('tenantId') tenantId: string,
  ) {
    const queryData = {
      tenantId,
      // user_id: req.user.name,
      // user_role: UserRoles[req.user.sub],
    };
    return await this.jobService.getJobsByStatus(queryData);
  }
}
