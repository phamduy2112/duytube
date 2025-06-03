import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use('/webhooks/clerk', express.raw({ type: '*/*' }));

  const config = new DocumentBuilder()
    .setTitle('API NestJS')
    .setDescription('Mô tả API')
    .setVersion('1.0')
    .addBearerAuth() // Nếu dùng JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 8080);
  
}
bootstrap();
