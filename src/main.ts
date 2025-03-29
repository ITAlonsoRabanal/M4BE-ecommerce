import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalMiddleware } from './common/middlewares/global.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(globalMiddleware);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))

  const swaggerConfig = new DocumentBuilder()
  .setTitle(`Demo nest`)
  .setDescription(`Api construida con Nest para demostracion. Fines educativos y practica`)
  .setVersion('1.0')
  .addBearerAuth()
  .build()

  // Continuar documentando los dtos
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
