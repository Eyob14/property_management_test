// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AssignContractorDto {
  @IsString()
  tenantId: string;

  @IsString()
  propertyId: string;

  @IsString()
  assignedTo: string;

  @IsString()
  jobId: string;
}
