import { Model } from 'mongoose';

import { NestFactory } from '@nestjs/core';

import { AppModule } from '../../app.module';
import { Comprador } from '../../operadores/entities/comprador.entity';
import { Fabricante } from '../../productos/entities/fabricante.entity';
import { Producto } from '../../productos/entities/producto.entity';
import { categoriasData } from './categorias.data';
import { compradoresData } from './compradores.data';
import { fabricantesData } from './fabricantes.data';
import { operadoresData } from './operadores.data';
import { productosData } from './productos.data';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);

  const manufacterModel = appContext.get<Model<Fabricante>>('FabricanteModel');
  const categoriaModel = appContext.get<Model<Producto>>('CategoriaModel');
  const productoModel = appContext.get<Model<Producto>>('ProductoModel');
  const compradorModel = appContext.get<Model<Comprador>>('CompradorModel');
  const operadorModel = appContext.get<Model<Comprador>>('OperadorModel');

  await manufacterModel.deleteMany({});
  await categoriaModel.deleteMany({});
  await productoModel.deleteMany({});
  await compradorModel.deleteMany({});
  await operadorModel.deleteMany({});

  await manufacterModel.insertMany(fabricantesData);
  await categoriaModel.insertMany(categoriasData);
  await productoModel.insertMany(productosData);
  await compradorModel.insertMany(compradoresData);
  await operadorModel.insertMany(operadoresData);

  console.log('Seed ejecutado con éxito!');
  await appContext.close();
}

bootstrap();
