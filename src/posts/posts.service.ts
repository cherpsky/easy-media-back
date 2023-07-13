import { Injectable } from '@nestjs/common';
import { CreatePostRequest } from 'src/auth/dtos/requests/create-post.request';
import { Post } from 'src/entities/post.entity';
import { AppResources } from 'src/enums/resources.enum';
import { AutoIncrementService } from 'src/services/autoincrement.service';

@Injectable()
export class PostsService {
  private readonly posts: Post[] = [
    {
      id: 1,
      title: 'test',
      description: 'This is a test post',
      createdAt: new Date(),
      userId: 1,
    },
  ];

  constructor(private autoincrement: AutoIncrementService) {}

  async createOne(data: CreatePostRequest, userId: number): Promise<Post> {
    const id = this.autoincrement.getNextId(AppResources.POST);
    const createdAt = new Date();
    const post: Post = { ...data, id, userId, createdAt };
    this.posts.push(post);
    this.autoincrement.setLatestId(AppResources.POST, id);

    return post;
  }

  async getUserPosts(userId: number): Promise<Post[]> {
    return this.posts.filter((post) => post.userId === userId);
  }

  async getAllPosts(): Promise<Post[]> {
    return this.posts;
  }
}
