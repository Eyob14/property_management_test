import {
  //   Body,
  Controller,
  //   Delete,
  //   Get,
  //   Param,
  //   Post,
  //   Put,
  //   Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
