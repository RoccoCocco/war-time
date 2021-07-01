/* istanbul ignore file */

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';

import { AppModule } from './app.module';
import { SentryInterceptor } from './interceptors/sentry';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('WarSim')
    .setDescription('Risk Simulation with a twist')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  Sentry.init({
    dsn: process.env.SENTRY_DSN || 'https://4c235cf283a044a587b748999893122c@o903267.ingest.sentry.io/5843017',
    environment: process.env.ENVIRONMENT || 'local',
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new SentryInterceptor());
  await app.listen(process.env['PORT'] || 3000);
}
bootstrap();
