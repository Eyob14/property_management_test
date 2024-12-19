import { Controller, Get, Req } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UserTokenPayload } from 'src/utils/constants';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get()
  async getWelcomePage(@Req() req: UserTokenPayload) {
    return this.authenticationService.welcomePage('eyob', 'admin');
  }
}
