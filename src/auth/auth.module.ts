import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [AuthController],
  imports: [UsersModule, ConfigModule],
  providers: [AuthService, UsersService],
  exports: [AuthService],
})
export class AuthModule {
  constructor(private configService: ConfigService) {}
}
