/* eslint-disable prettier/prettier */

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredetialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.createUser(authCredetialsDto);
  }

  @Post('/signin')
  signIn(@Body() authCredetialsDto: AuthCredentialsDto): Promise<string> {
    return this.authService.signIn(authCredetialsDto);
  }
}
