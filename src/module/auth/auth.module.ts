import { Module } from '@nestjs/common';
import { AuthController } from '@src/module/auth/auth.controller';
import { AuthService } from '@src/module/auth/auth.service';
import { PrismaModule } from '@src/module/prisma/prisma.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [PrismaModule],
})
export class AuthModule {
}
