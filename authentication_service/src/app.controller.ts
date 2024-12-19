import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  getWelcomePage(
    @Query('user_id') user_id: string,
    @Query('user_role') user_role: string,
  ): string {
    return this.appService.getWelcomePage(user_id, user_role);
  }
}
