import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginResponse } from './dtos/response/login.response';
import { User } from 'src/entities/user.entity';
import { RegistrationRequest } from './dtos/requests/registration.request';
import { AutoIncrementService } from 'src/services/autoincrement.service';
import { AppResources } from 'src/enums/resources.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private autoincrementService: AutoIncrementService,
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

  async register(registrationRequest: RegistrationRequest): Promise<boolean> {
    const userExists = await this.userService.findOne(
      registrationRequest.email,
    );
    if (userExists)
      throw new UnprocessableEntityException('The email already exists');
    const id = this.autoincrementService.getNextId(AppResources.USER);
    const user: User = {
      id,
      ...registrationRequest,
    };
    this.userService.createOne(user);
    this.autoincrementService.setLatestId(AppResources.USER, id);
    return true;
  }
}
