import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginRequest } from './dtos/requests/login.request';
import { AuthService } from './auth.service';
import { LoginResponse } from './dtos/response/login.response';
import { RegistrationRequest } from './dtos/requests/registration.request';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
    return this.authService.getAuthentication(
      loginRequest.email,
      loginRequest.password,
    );
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(
    @Body() registrationRequest: RegistrationRequest,
  ): Promise<boolean> {
    return this.authService.register(registrationRequest);
  }
}
