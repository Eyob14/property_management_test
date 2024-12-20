import {
  Body,
  Controller,
  Get,
  //   Delete,
  //   Get,
  //   Param,
  Post,
  Query,
  //   Put,
  //   Query,
} from '@nestjs/common';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post('assign')
  async assignMaintenanceJob(@Body() payload: any) {
    return await this.jobsService.assignMaintenanceJob(payload);
  }

  @Get('status')
  async getJobsByStatus(@Query() query: Record<string, any>): Promise<any> {
    return await this.jobsService.getJobsByStatus(query);
  }
}
