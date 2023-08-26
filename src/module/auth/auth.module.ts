import { Module } from '@nestjs/common';
import { AuthController } from '@src/module/auth/auth.controller';
import { AuthService } from '@src/module/auth/auth.service';
import { PrismaModule } from '@src/module/prisma/prisma.module';
import { AuthRepository } from '@src/module/auth/auth.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
  imports: [PrismaModule],
})
export class AuthModule {
}
