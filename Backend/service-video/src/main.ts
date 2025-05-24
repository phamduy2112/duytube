import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use('/webhooks/clerk', express.raw({ type: '*/*' }));
  await app.listen(process.env.PORT ?? 8080);
  console.log(`Listening on port ${process.env.PORT}`)

}
bootstrap();
