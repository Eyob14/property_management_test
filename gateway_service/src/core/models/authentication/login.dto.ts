// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  // @ApiProperty()
  @IsEmail()
  email: string;

  // @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  password?: string;
}
