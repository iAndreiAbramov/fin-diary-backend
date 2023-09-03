import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '@src/module/users/dto/create-user.dto';
import { UsersRepository } from '@src/module/users/users.repository';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { Message } from '@src/constants/message';
import { LoginUserDto } from '@src/module/users/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from '@src/types/jwt-payload.interface';
import { LoginUserRdo } from '@src/module/users/rdo/login-user.rdo';
import { ChangePasswordDto } from '@src/module/users/dto/change-password.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
  }

  public async findById(id: number): Promise<User> {
    return await this.usersRepository.findById(id);
  }

  public async register({ email, password }: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findByEmail(email);

    if (existingUser) {
      throw new ConflictException(Message.UserWithEmailExists(email));
    }

    const passwordHash = await this.hashPassword(password);
    return this.usersRepository.create({ email, passwordHash });
  }

  public async login({ email, password }: LoginUserDto): Promise<LoginUserRdo> {
    const existingUser = await this.usersRepository.findByEmail(email);

    if (!existingUser) {
      throw new NotFoundException(Message.UserWithEmailNotFound(email));
    }

    const isPasswordCorrect = await this.checkPassword(password, existingUser.passwordHash);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException(Message.PasswordIsIncorrect());
    }

    return { ...existingUser, accessToken: await this.prepareJwt(existingUser) };
  }

  public async changePassword({ id, oldPassword, newPassword }: ChangePasswordDto): Promise<void> {
    const existingUser = await this.usersRepository.findById(id);

    if (!existingUser) {
      throw new NotFoundException(Message.UserWithIdNotFound(existingUser.id));
    }

    const isOldPasswordCorrect = await this.checkPassword(oldPassword, existingUser.passwordHash);

    if (!isOldPasswordCorrect) {
      throw new UnauthorizedException(Message.PasswordIsIncorrect());
    }

    const newUser = { ...existingUser, passwordHash: await this.hashPassword(newPassword) };

    await this.usersRepository.update(newUser);
  }

  private async checkPassword(password: string, passwordHash: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = this.configService.getOrThrow('app.saltRounds');
    return await bcrypt.hash(password, saltRounds);
  }

  private async prepareJwt(user: User): Promise<string> {
    const jwtPayload: IJwtPayload = {
      id: user.id,
      email: user.email,
    };

    return await this.jwtService.signAsync(jwtPayload);
  }
}
