import {
  //   Body,
  Controller,
  //   Delete,
  //   Get,
  //   Param,
  //   Post,
  //   Put,
  //   Query,
} from '@nestjs/common';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}
}
