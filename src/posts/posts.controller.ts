import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post as HttpPost,
  Body,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from 'src/entities/post.entity';
import { CreatePostRequest } from 'src/auth/dtos/requests/create-post.request';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @HttpCode(HttpStatus.OK)
  @Get('my-posts')
  myPosts(): Promise<Post[]> {
    return this.postService.getUserPosts(1);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  getAll(): Promise<Post[]> {
    return this.postService.getAllPosts();
  }

  @HttpCode(HttpStatus.CREATED)
  @HttpPost()
  createOne(@Body() post: CreatePostRequest): Promise<Post> {
    return this.postService.createOne(post, 1);
  }
}
