import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post as HttpPost,
  Body,
  Request,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from 'src/entities/post.entity';
import { CreatePostRequest } from 'src/auth/dtos/requests/create-post.request';
import { Request as HttpRequest } from 'express';
import { User } from 'src/entities/user.entity';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @HttpCode(HttpStatus.OK)
  @Get('my-posts')
  myPosts(@Request() request: HttpRequest & { user: User }): Promise<Post[]> {
    return this.postService.getUserPosts(request.user.id);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  getAll(): Promise<Post[]> {
    return this.postService.getAllPosts();
  }

  @HttpCode(HttpStatus.CREATED)
  @HttpPost()
  createOne(
    @Body() post: CreatePostRequest,
    @Request() request: HttpRequest & { user: User },
  ): Promise<Post> {
    return this.postService.createOne(post, request.user.id);
  }
}
