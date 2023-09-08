import { IsNumber, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @IsNumber()
  id: number;

  @ApiProperty({
    type: String,
    description: 'Old password',
    minLength: 8,
    example: 'asd12345'
  })
  @IsString()
  @MinLength(8)
  oldPassword: string;

  @ApiProperty({
    type: String,
    description: 'New password',
    minLength: 8,
    example: 'Aco9_1#%)6ksc3',
  })
  @IsString()
  @MinLength(8)
  newPassword: string;
}
