import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AutoIncrementService } from 'src/services/autoincrement.service';
import { PostsController } from './posts.controller';

@Module({
  providers: [PostsService, AutoIncrementService],
  controllers: [PostsController],
})
export class PostsModule {}
