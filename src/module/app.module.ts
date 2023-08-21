import { Module } from '@nestjs/common';
import { AppConfigModule } from '@src/module/app-config/app-config.module';
import { AuthModule } from '@src/module/auth/auth.module';

@Module({
  imports: [AppConfigModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
