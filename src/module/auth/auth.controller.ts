import { Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '@src/module/auth/dto/create-user.dto';
import { CreateUserRdo } from '@src/module/auth/rdo/create-user.rdo';
import { plainToInstance } from 'class-transformer';
import { AuthService } from '@src/module/auth/auth.service';

@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('register')
  public async register(dto: CreateUserDto): Promise<CreateUserRdo> {
    const user = await this.authService.register(dto);
    return plainToInstance(CreateUserRdo, user);
  }
}
