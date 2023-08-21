import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');

  const appConfig = app.get(ConfigService);
  const port = appConfig.getOrThrow('app.port');
  const mode = appConfig.getOrThrow('app.mode');

  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
  Logger.log(`✌️  Application is running in ${mode} mode`);
}

void bootstrap();
