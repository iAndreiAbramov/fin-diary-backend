import { Expose } from 'class-transformer';

export class GetUserRdo {
  @Expose()
  id: number;

  @Expose()
  email: string;
}
