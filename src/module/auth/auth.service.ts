import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@src/module/auth/dto/create-user.dto';
import { AuthRepository } from '@src/module/auth/auth.repository';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { Message } from '@src/constants/message';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
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

  public async hashPassword(password: string): Promise<string> {
    const saltRounds = this.configService.getOrThrow('app.saltRounds');
    return await bcrypt.hash(password, saltRounds);
  }
}
