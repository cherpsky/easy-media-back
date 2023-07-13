import { User } from 'src/entities/user.entity';

export class LoginResponse {
  accessToken: string;
  user: Omit<User, 'password'>;
}
