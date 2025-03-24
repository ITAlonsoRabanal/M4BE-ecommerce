import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalMiddleware } from './common/middlewares/global.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(globalMiddleware);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
