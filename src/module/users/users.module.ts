import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from '@src/module/users/users.controller';
import { UsersService } from '@src/module/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ParseUserIdMiddleware } from '@src/middleware/parse-user-id.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@src/module/users/entities/user.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow('app.jwtSecret'),
      }),
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ParseUserIdMiddleware).forRoutes(UsersController);
  }
}
