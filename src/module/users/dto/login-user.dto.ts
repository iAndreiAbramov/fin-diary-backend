import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    type: String,
    description: 'User email',
    example: 'faker@fake.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    description: 'User password',
    minLength: 8,
    example: 'asd12345'
  })
  @IsString()
  @MinLength(8)
  password: string;
}
