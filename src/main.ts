import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const appConfig = app.get(ConfigService);
  const port = appConfig.getOrThrow('app.port');
  const mode = appConfig.getOrThrow('app.mode');

  const config = new DocumentBuilder()
    .setTitle('Fin diary API')
    .setVersion('1.0')
    .addTag('Fin diary')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
  Logger.log(`✌️  Application is running in ${mode} mode`);
}

void bootstrap();
