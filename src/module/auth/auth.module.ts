import { Module } from '@nestjs/common';
import { AuthController } from '@src/module/auth/auth.controller';
import { AuthService } from '@src/module/auth/auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {
}
