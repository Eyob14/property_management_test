import { Controller, Get } from '@nestjs/common';
import { JobManagementService } from './job_management.service';

@Controller('jobs')
export class JobManagementController {
  constructor(private readonly jobService: JobManagementService) {}

  @Get('welcome')
  async getWelcomePage() {
    return await this.jobService.welcomePage();
  }
}
