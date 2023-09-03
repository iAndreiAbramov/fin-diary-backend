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

  @ApiProperty({
    type: String,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYWtlQGZha2UuY28iLCJpYXQiOjE2OTM3NDc3NzJ9',
    description: 'JWT Access Token',
  })
  @Expose()
  accessToken: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  passwordHash: string;
}
