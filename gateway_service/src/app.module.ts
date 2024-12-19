import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PropertyManagementModule } from './modules/property_management/property_management.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthenticationModule,
    PropertyManagementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
