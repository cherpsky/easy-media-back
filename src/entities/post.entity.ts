import { User } from './user.entity';

export class Post {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  userId: number;
  user?: User;
}
