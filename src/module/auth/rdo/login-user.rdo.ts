import { User } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class LoginUserRdo implements User {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  passwordHash: string;
}
