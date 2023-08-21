import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '@src/module/auth/dto/create-user.dto';
import { CreateUserRdo } from '@src/module/auth/rdo/create-user.rdo';
import { AuthService } from '@src/module/auth/auth.service';
import { fillObject } from '@src/utils/fill-object';

@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('register')
  public async register(@Body() dto: CreateUserDto): Promise<CreateUserRdo> {
    const user = await this.authService.register(dto);
    return fillObject(CreateUserRdo, user);
  }
}
