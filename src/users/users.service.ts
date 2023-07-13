import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'Andrés',
      password: '189ydjkansa',
      email: 'carldres07@gmail.com',
    },
    {
      id: 2,
      name: 'María',
      password: 'secret',
      email: 'maria@gmail.com',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async getUserById(userId: number): Promise<User | undefined> {
    return this.users.find((user) => user.id === userId);
  }

  async createOne(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }
}
