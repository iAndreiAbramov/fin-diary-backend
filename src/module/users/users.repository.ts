import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/module/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {
  }

  public async findById(id: number): Promise<User> {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  public async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({ data });
  }

  public async update(data: User): Promise<User> {
    return this.prismaService.user.update({
      where: { id: data.id },
      data,
    });
  }
}
