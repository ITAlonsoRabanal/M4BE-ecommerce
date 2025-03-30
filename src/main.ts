import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalMiddleware } from './common/middlewares/global.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { auth } from 'express-openid-connect';
import { config as auth0config } from './config/auth0.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(auth(auth0config));

  app.use(globalMiddleware);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('e-commerce API')
    .setDescription('Welcome to my personal api project. My name is Ignacio Alonso, I made this app on NestJS.')
    .setVersion('1.0')
    .addBearerAuth()
    .setExternalDoc('LinkedIn Profile', 'https://www.linkedin.com/in/ignacio-alonso-5680872b4/')
    .build();

  // Continuar documentando los DTOs
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
