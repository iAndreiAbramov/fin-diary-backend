import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '@src/module/users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { Message } from '@src/constants/message';
import { LoginUserDto } from '@src/module/users/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from '@src/types/jwt-payload.interface';
import { LoginUserRdo } from '@src/module/users/rdo/login-user.rdo';
import { ChangePasswordDto } from '@src/module/users/dto/change-password.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '@src/module/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {
  }

  public async findById(id: number): Promise<UserEntity> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  public async findByEmail(email: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  public async register({ email, password }: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.findByEmail(email);

    if (existingUser) {
      throw new ConflictException(Message.UserWithEmailExists(email));
    }

    const passwordHash = await this.hashPassword(password);
    return this.usersRepository.save({ email, passwordHash });
  }

  public async login({ email, password }: LoginUserDto): Promise<LoginUserRdo> {
    const existingUser = await this.findByEmail(email);

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
    const existingUser = await this.findById(id);

    if (!existingUser) {
      throw new NotFoundException(Message.UserWithIdNotFound(existingUser.id));
    }

    const isOldPasswordCorrect = await this.checkPassword(oldPassword, existingUser.passwordHash);

    if (!isOldPasswordCorrect) {
      throw new UnauthorizedException(Message.PasswordIsIncorrect());
    }

    const newUser = { ...existingUser, passwordHash: await this.hashPassword(newPassword) };

    await this.usersRepository.save(newUser);
  }

  private async checkPassword(password: string, passwordHash: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = this.configService.getOrThrow('app.saltRounds');
    return await bcrypt.hash(password, saltRounds);
  }

  private async prepareJwt(user: UserEntity): Promise<string> {
    const jwtPayload: IJwtPayload = {
      id: user.id,
      email: user.email,
    };

    return await this.jwtService.signAsync(jwtPayload);
  }
}
