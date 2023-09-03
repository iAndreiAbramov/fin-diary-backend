import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRdo {
  @ApiProperty({
    type: Number,
    example: 111,
  })
  @Expose()
  id: number;

  @ApiProperty({
    type: String,
    example: 'faker@fake.com',
  })
  @Expose()
  email: string;
}
