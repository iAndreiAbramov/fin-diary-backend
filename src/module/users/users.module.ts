import { Module } from '@nestjs/common';
import { UsersController } from '@src/module/users/users.controller';
import { UsersService } from '@src/module/users/users.service';
import { PrismaModule } from '@src/module/prisma/prisma.module';
import { UsersRepository } from '@src/module/users/users.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  imports: [PrismaModule],
  exports: [UsersService],
})
export class UsersModule {
}
