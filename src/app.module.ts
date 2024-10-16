import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OperadoresModule } from './operadores/operadores.module';
import { ProductosModule } from './productos/productos.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { environments } from 'src/enviroments';
import config from 'src/config';
import * as Joi from 'joi';

@Module({
  imports: [
    HttpModule,
    OperadoresModule,
    ProductosModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || environments['dev'],
      load: [config], // archivo de tipado
      validationSchema: Joi.object({
        APIKEY: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }), // validaciones con Joi
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TAREA_ASYNC',
      useFactory: async (http: HttpService) => {
        const req = http.get('https://jsonplaceholder.typicode.com/posts');
        const tarea = await lastValueFrom(req);
        return tarea.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
