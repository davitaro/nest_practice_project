/* eslint-disable prettier/prettier */

import { Body, Controller, Post, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController', { timestamp: true });
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredetialsDto: AuthCredentialsDto): Promise<void> {
    this.logger.verbose(
      `User with this username is trying to sign up:  ${authCredetialsDto.username}`,
    );
    return this.authService.createUser(authCredetialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredetialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    this.logger.verbose(
      `User with this username is trying to sign in:  ${authCredetialsDto.username}`,
    );
    return this.authService.signIn(authCredetialsDto);
  }
}
