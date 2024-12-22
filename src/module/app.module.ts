import { Module } from '@nestjs/common';
import { AppConfigModule } from '@src/module/app-config/app-config.module';
import { UsersModule } from '@src/module/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDbConfig } from '@src/config';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRoot(getDbConfig()),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
