import { Model } from 'mongoose';

import { NestFactory } from '@nestjs/core';

import { AppModule } from '../../app.module';
import { Comprador } from '../../operadores/entities/comprador.entity';
import { Pedido } from '../../operadores/entities/pedido.entity';
import { Fabricante } from '../../productos/entities/fabricante.entity';
import { Producto } from '../../productos/entities/producto.entity';
import { compradoresData } from './compradores.data';
import { fabricantesData } from './fabricantes.data';
import { operadoresData } from './operadores.data';
import { PedidosData } from './pedido.data';
import { productosData } from './productos.data';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);

  const manufacterModel = appContext.get<Model<Fabricante>>('FabricanteModel');
  const productoModel = appContext.get<Model<Producto>>('ProductoModel');
  const compradorModel = appContext.get<Model<Comprador>>('CompradorModel');
  const operadorModel = appContext.get<Model<Comprador>>('OperadorModel');
  const orderModel = appContext.get<Model<Pedido>>('PedidoModel');

  await manufacterModel.deleteMany({});
  await productoModel.deleteMany({});
  await compradorModel.deleteMany({});
  await operadorModel.deleteMany({});
  await orderModel.deleteMany({});

  await manufacterModel.insertMany(fabricantesData);
  await productoModel.insertMany(productosData);
  await compradorModel.insertMany(compradoresData);
  await operadorModel.insertMany(operadoresData);
  await orderModel.insertMany(PedidosData);

  console.log('Seed ejecutado con éxito!');
  await appContext.close();
}

bootstrap();
