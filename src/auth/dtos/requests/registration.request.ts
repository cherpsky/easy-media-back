import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegistrationRequest {
  @IsNotEmpty()
  name: string;

  @MinLength(8)
  password: string;

  @IsEmail()
  email: string;
}
