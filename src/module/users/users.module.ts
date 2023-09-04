import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from '@src/module/users/users.controller';
import { UsersService } from '@src/module/users/users.service';
import { PrismaModule } from '@src/module/prisma/prisma.module';
import { UsersRepository } from '@src/module/users/users.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ParseUserIdMiddleware } from '@src/middleware/parse-user-id.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow('app.jwtSecret'),
      }),
    })],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ParseUserIdMiddleware).forRoutes(UsersController);
  }
}
