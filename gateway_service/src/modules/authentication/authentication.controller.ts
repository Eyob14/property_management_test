import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UserTokenPayload } from 'src/utils/constants';
import { SignUpDTO } from 'src/core/models/authentication/signup.dto';
import { LoginDto } from 'src/core/models/authentication/login.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get()
  async getWelcomePage(@Req() req: UserTokenPayload) {
    return this.authenticationService.welcomePage('eyob', 'admin');
  }

  @Post('signup')
  async signUp(@Body() payload: SignUpDTO) {
    return await this.authenticationService.signUp(payload);
  }

  @Post('login')
  async login(
    @Body() payload: LoginDto,
  ) {
    return await this.authenticationService.login(payload);
  }
}
