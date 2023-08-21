import { Expose } from 'class-transformer';

export class CreateUserRdo {
  @Expose()
  id: number;

  @Expose()
  email: string;
}
