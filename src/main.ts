import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // evita campos extras en el Payload al crear
      //forbidNonWhitelisted: true, // Lanzar error si existen datos prohibidos
      //disableErrorMessages: true, // Desabilitar mensajes de error (producción)
    }),
  );
  await app.listen(3000);
}
bootstrap();
