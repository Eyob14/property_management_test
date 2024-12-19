import {
  Body,
  Controller,
  UseGuards,
  //   Delete,
  //   Get,
  //   Param,
  Post,
  Request,
  //   Put,
  //   Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UsersInterface } from 'src/models/users.model';

@Controller('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(DoesUserExist)
  @Post('signup')
  async signUp(@Body() payload: UsersInterface) {
    return await this.authService.signUp(payload);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: { user: UsersInterface }) {
    return await this.authService.login(req.user);
  }
}
