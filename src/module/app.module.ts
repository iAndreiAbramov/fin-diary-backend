import { Module } from '@nestjs/common';
import { AppConfigModule } from '@src/module/app-config/app-config.module';
import { AuthModule } from '@src/module/auth/auth.module';
import { PrismaModule } from '@src/module/prisma/prisma.module';

@Module({
  imports: [AppConfigModule, AuthModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
