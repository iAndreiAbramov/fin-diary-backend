import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserRdo {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'User id',
  })
  @Expose()
  id: number;

  @ApiProperty({
    type: String,
    example: 'faker@fake.com',
    description: 'User email',
  })
  @Expose()
  email: string;
  
  @Exclude()
  accessToken: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  passwordHash: string;
}
