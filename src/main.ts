import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { MongooseTransformInterceptor } from './common/mongoose-transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Permite cualquier origen
    methods: '*', // Permite cualquier método (GET, POST, etc.)
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // evita campos extras en el Payload al crear
      //forbidNonWhitelisted: true, // Lanzar error si existen datos prohibidos
      //disableErrorMessages: true, // Desabilitar mensajes de error (producción)
      transformOptions: {
        enableImplicitConversion: true, // texto a número
      },
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new MongooseTransformInterceptor());
  const config = new DocumentBuilder()
    .setTitle('Hedy - Ecommerce')
    .setDescription('API para el proyecto Hedy-Ecommerce, del curso de Calilegua Backend')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
