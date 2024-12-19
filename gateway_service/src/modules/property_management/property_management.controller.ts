import { Controller } from '@nestjs/common';
import { PropertyManagementService } from './property_management.service';

@Controller('properties')
export class PropertyManagementController {
  constructor(private readonly propertiesService: PropertyManagementService) {}
}
