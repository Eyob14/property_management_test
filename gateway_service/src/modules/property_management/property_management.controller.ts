import { Controller, Get } from '@nestjs/common';
import { PropertyManagementService } from './property_management.service';

@Controller('properties')
export class PropertyManagementController {
  constructor(private readonly propertiesService: PropertyManagementService) {}

  @Get('welcome')
  async getWelcomePage() {
    return await this.propertiesService.welcomePage();
  }
}
