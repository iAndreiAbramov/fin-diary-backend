import { IsString } from 'class-validator';
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
    description: 'Strong password',
    minLength: 8,
    example: 'Aco9_1#%)6ksc3'
  })
  @IsString()
  password: string;
}
