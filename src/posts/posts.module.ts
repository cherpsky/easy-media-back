import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AutoIncrementService } from 'src/services/autoincrement.service';
import { PostsController } from './posts.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [PostsService, AutoIncrementService, UsersService],
  controllers: [PostsController],
})
export class PostsModule {}
