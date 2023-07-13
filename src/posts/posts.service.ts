import { Injectable } from '@nestjs/common';
import { CreatePostRequest } from 'src/auth/dtos/requests/create-post.request';
import { Post } from 'src/entities/post.entity';
import { AppResources } from 'src/enums/resources.enum';
import { AutoIncrementService } from 'src/services/autoincrement.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  private readonly posts: Post[] = [
    {
      id: 1,
      title: 'test',
      description: 'This is a test post',
      createdAt: new Date(),
      userId: 2,
    },
  ];

  constructor(
    private autoincrement: AutoIncrementService,
    private userService: UsersService,
  ) {}

  async createOne(data: CreatePostRequest, userId: number): Promise<Post> {
    const id = this.autoincrement.getNextId(AppResources.POST);
    const createdAt = new Date();
    const post: Post = { ...data, id, userId, createdAt };
    this.posts.push(post);
    this.autoincrement.setLatestId(AppResources.POST, id);

    return {
      ...post,
      author: (await this.userService.getUserById(post.userId))?.name,
    };
  }

  async getUserPosts(userId: number): Promise<Post[]> {
    return this.posts.filter((post) => post.userId === userId);
  }

  async getAllPosts(): Promise<Post[]> {
    return await Promise.all(
      this.posts.map(async (post) => ({
        ...post,
        author: (await this.userService.getUserById(post.userId))?.name,
      })),
    );
  }
}
