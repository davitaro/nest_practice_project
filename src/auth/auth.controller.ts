/* eslint-disable prettier/prettier */

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() authCredetialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.createUser(authCredetialsDto);
  }
}
