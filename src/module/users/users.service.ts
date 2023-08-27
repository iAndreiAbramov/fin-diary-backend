import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '@src/module/users/dto/create-user.dto';
import { UsersRepository } from '@src/module/users/users.repository';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { Message } from '@src/constants/message';
import { LoginUserDto } from '@src/module/users/dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly authRepository: UsersRepository,
    private readonly configService: ConfigService,
  ) {
  }

  public async register({ email, password }: CreateUserDto): Promise<User> {
    const existingUser = await this.authRepository.findByEmail(email);

    if (existingUser) {
      throw new ConflictException(Message.UserWithEmailExists(email));
    }

    const passwordHash = await this.hashPassword(password);
    return this.authRepository.create({ email, passwordHash });
  }

  public async login({ email, password }: LoginUserDto): Promise<User> {
    const existingUser = await this.authRepository.findByEmail(email);

    if (!existingUser) {
      throw new NotFoundException(Message.UserWithEmailNotFound(email));
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.passwordHash);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException(Message.PasswordIsIncorrect());
    }

    return existingUser;
  }

  public async hashPassword(password: string): Promise<string> {
    const saltRounds = this.configService.getOrThrow('app.saltRounds');
    return await bcrypt.hash(password, saltRounds);
  }
}
