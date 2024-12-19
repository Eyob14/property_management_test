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
import { PropertiesService } from './properties.service';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}
}
