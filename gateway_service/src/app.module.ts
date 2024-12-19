import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PropertyManagementModule } from './modules/property_management/property_management.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { JobManagementModule } from './modules/job_management/job_management.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthenticationModule,
    PropertyManagementModule,
    JobManagementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
