import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserRdo {
  @ApiProperty({
    type: Number,
    example: 1,
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
