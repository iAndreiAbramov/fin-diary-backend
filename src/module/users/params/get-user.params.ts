import { IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserParams {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'User ID',
  })
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  id: number;
}
