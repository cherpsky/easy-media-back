import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AutoIncrementService } from 'src/services/autoincrement.service';
import { PostsController } from './posts.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [PostsService, AutoIncrementService],
  controllers: [PostsController],
})
export class PostsModule {}
