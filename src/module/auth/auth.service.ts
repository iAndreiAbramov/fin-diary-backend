import { Injectable } from '@nestjs/common';
import { CreateUserRdo } from '@src/module/auth/rdo/create-user.rdo';
import { CreateUserDto } from '@src/module/auth/dto/create-user.dto';

@Injectable()
export class AuthService {
  mockUser: CreateUserRdo = {
    email: 'fake@mail.com',
    id: 1,
  };

  public async register(dto: CreateUserDto): Promise<CreateUserRdo> {
    return this.mockUser;
  }
}
