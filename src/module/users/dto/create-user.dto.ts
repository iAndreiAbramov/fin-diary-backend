import { IsEmail, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'User email',
    example: 'faker@fake.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Strong password',
    minLength: 8,
    example: 'Aco9_1#%)6ksc3'
  })
  @IsStrongPassword({
    minLength: 8,
  })
  password: string;
}
