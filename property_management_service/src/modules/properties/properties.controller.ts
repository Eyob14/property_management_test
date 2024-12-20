import { Controller, Get, Query } from '@nestjs/common';
import { PropertiesService } from './properties.service';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get('search')
  async getPropertiesSearch(@Query() query: Record<string, any>): Promise<any> {
    return await this.propertiesService.getPropertiesSearch(query);
  }
}
