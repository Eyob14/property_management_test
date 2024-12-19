import { Controller, Get, Req } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get()
  async getWelcomePage(@Req() req: string) {
    return this.authenticationService.welcomePage('Welcome');
  }
}
