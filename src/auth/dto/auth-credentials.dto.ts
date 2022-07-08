/* eslint-disable prettier/prettier */
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(6)
  @MaxLength(25)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(25)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain at least one special character, one upper and one lower case letter, and one number.',
  })
  password: string;
}
