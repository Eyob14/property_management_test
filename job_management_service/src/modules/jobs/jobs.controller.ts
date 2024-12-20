import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { IAssignContractor } from 'src/utils/job_types';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Put('assign')
  async assignMaintenanceJob(@Body() payload: IAssignContractor) {
    return await this.jobsService.assignMaintenanceJob(payload);
  }

  @Get('status')
  async getJobsByStatus(@Query() query: Record<string, any>): Promise<any> {
    return await this.jobsService.getJobsByStatus(query);
  }
}
