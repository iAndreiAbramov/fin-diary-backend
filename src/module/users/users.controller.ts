import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from '@src/module/users/dto/create-user.dto';
import { CreateUserRdo } from '@src/module/users/rdo/create-user.rdo';
import { UsersService } from '@src/module/users/users.service';
import { fillObject } from '@src/utils/fill-object';
import { LoginUserDto } from '@src/module/users/dto/login-user.dto';
import { LoginUserRdo } from '@src/module/users/rdo/login-user.rdo';

@Controller('user')
export class UsersController {
  constructor(private readonly authService: UsersService) {
  }

  @Post('register')
  public async register(@Body() dto: CreateUserDto): Promise<CreateUserRdo> {
    const user = await this.authService.register(dto);
    return fillObject(CreateUserRdo, user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() dto: LoginUserDto): Promise<LoginUserRdo> {
    const user = await this.authService.login(dto);
    return fillObject(LoginUserRdo, user);
  }
}
