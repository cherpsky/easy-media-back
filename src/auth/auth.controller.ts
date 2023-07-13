import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginRequest } from './dtos/requests/login.request';
import { AuthService } from './auth.service';
import { LoginResponse } from './dtos/response/login.response';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() credentials: LoginRequest): Promise<LoginResponse> {
    return this.authService.getAuthentication(
      credentials.email,
      credentials.password,
    );
  }
}
