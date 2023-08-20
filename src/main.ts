import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app/app.module.js';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

void bootstrap();
