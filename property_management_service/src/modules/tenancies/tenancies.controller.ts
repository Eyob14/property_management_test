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
import { TenanciesService } from './tenancies.service';

@Controller('tenancies')
export class TenanciesController {
  constructor(private readonly tenanciesService: TenanciesService) {}
}
