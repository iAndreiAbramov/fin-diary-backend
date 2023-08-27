import { Module } from '@nestjs/common';
import { AppConfigModule } from '@src/module/app-config/app-config.module';
import { UsersModule } from '@src/module/users/users.module';
import { PrismaModule } from '@src/module/prisma/prisma.module';

@Module({
  imports: [AppConfigModule, UsersModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
