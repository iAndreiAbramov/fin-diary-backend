import { IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetUserParams {
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  id: number;
}
