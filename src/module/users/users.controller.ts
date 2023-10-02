import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '@src/module/users/dto/create-user.dto';
import { CreateUserRdo } from '@src/module/users/rdo/create-user.rdo';
import { UsersService } from '@src/module/users/users.service';
import { fillObject } from '@src/utils/fill-object';
import { LoginUserDto } from '@src/module/users/dto/login-user.dto';
import { LoginUserRdo } from '@src/module/users/rdo/login-user.rdo';
import { IsOwnerJwtGuard } from '@src/module/users/guards/is-owner-jwt-guard.service';
import { GetUserRdo } from '@src/module/users/rdo/get-user.rdo';
import { GetUserParams } from '@src/module/users/params/get-user.params';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ChangePasswordDto } from '@src/module/users/dto/change-password.dto';
import { Response } from 'express';

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
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token',
    example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
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

  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Token',
    example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  @ApiOkResponse({
    description: 'OK',
  })
  @ApiUnauthorizedResponse({
    description: 'JWT token is invalid',
  })
  @ApiForbiddenResponse({
    description: 'Password is incorrect',
  })
  @UseGuards(IsOwnerJwtGuard)
  @HttpCode(HttpStatus.OK)
  @Patch('change-password')
  public async changePassword(@Body() dto: ChangePasswordDto): Promise<void> {
    return this.usersService.changePassword(dto);
  }

  @ApiOkResponse({
    type: LoginUserRdo,
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async login(
    @Body() dto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginUserRdo> {
    const user = await this.usersService.login(dto);
    res.setHeader('X-Token', user.accessToken);
    return fillObject(LoginUserRdo, user);
  }
}
