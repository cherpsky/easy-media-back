import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginResponse } from './dtos/response/login.response';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async getAuthentication(email: string, pass: string): Promise<LoginResponse> {
    const response = await this.userService.findOne(email);
    if (response?.password !== pass) throw new UnauthorizedException();
    const accessToken = await this.jwtService.signAsync({
      userId: response.id,
    });
    const { password, ...user } = response;
    return { accessToken, user };
  }
}
