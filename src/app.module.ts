import * as Joi from 'joi';
import { MongoClient } from 'mongodb';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { DatabaseModule } from './database/database.module';
import { environments } from './enviroments';
import { OperadoresModule } from './operadores/operadores.module';
import { ProductosModule } from './productos/productos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || environments['dev'],
      load: [config], // archivo de tipado
      validationSchema: Joi.object({
        APIKEY: Joi.string().required(),
        MONGO_HOST: Joi.string().required(),
        MONGO_INITDB_PORT: Joi.number().default(27017),
        MONGO_INITDB_ROOT_USERNAME: Joi.string().required(),
        MONGO_INITDB_ROOT_PASSWORD: Joi.string().required(),
        MONGO_INITDB_DATABASE: Joi.string().required(),
        MONGO_CONNECTION: Joi.string().required(),
      }), // validaciones con Joi
      isGlobal: true,
    }),
    OperadoresModule,
    ProductosModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'MONGO',
      useFactory: async () => {
        const uri = 'mongodb://mongo:123456@localhost:27017/?authMechanism=DEFAULT';
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db('admin');
        return database;
      },
    },
  ],
})
export class AppModule {}
