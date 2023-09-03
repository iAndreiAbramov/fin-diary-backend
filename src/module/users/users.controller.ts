import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '@src/module/users/dto/create-user.dto';
import { CreateUserRdo } from '@src/module/users/rdo/create-user.rdo';
import { UsersService } from '@src/module/users/users.service';
import { fillObject } from '@src/utils/fill-object';
import { LoginUserDto } from '@src/module/users/dto/login-user.dto';
import { LoginUserRdo } from '@src/module/users/rdo/login-user.rdo';
import { IsOwnerJwtGuard } from '@src/module/users/guards/is-owner-jwt-guard.service';
import { GetUserRdo } from '@src/module/users/rdo/get-user.rdo';
import { GetUserParams } from '@src/module/users/params/get-user.params';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ChangePasswordDto } from '@src/module/users/dto/change-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @ApiOkResponse({
    type: GetUserRdo,
  })
  @ApiUnauthorizedResponse({
    description: 'JWT access token is invalid',
  })
  @UseGuards(IsOwnerJwtGuard)
  @Get(':id')
  public async getUserById(@Param() params: GetUserParams): Promise<GetUserRdo> {
    const user = await this.usersService.findById(params?.id);
    return fillObject(GetUserRdo, user);
  }

  @ApiCreatedResponse({
    type: CreateUserRdo,
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @Post('register')
  public async register(@Body() dto: CreateUserDto): Promise<CreateUserRdo> {
    const user = await this.usersService.register(dto);
    return fillObject(CreateUserRdo, user);
  }

  @UseGuards(IsOwnerJwtGuard)
  @Patch('change-password')
  @HttpCode(HttpStatus.OK)
  public async changePassword(@Body() dto: ChangePasswordDto): Promise<void> {
    return this.usersService.changePassword(dto);
  }

  @ApiOkResponse({
    type: LoginUserRdo,
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() dto: LoginUserDto): Promise<LoginUserRdo> {
    const user = await this.usersService.login(dto);
    return fillObject(LoginUserRdo, user);
  }
}
