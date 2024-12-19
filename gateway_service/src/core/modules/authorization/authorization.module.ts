import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AuthorizationService],
  exports: [AuthorizationService],
})
export class AuthorizationModule {}
