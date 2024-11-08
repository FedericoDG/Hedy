import { NestFactory } from '@nestjs/core';

import { AppModule } from '../../app.module';
import { CategoriasSeederService } from './categoria.seeder';
import { CompradoresSeederService } from './comprador.seeder';
import { FabricantesSeederService } from './fabricante.seeder';
import { OperadoresSeederService } from './operador.seeder';
import { PedidosSeederService } from './pedido.seeder';
import { ProductosSeederService } from './producto.seeder';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const manufacterSeeder = app.get(FabricantesSeederService);
  const categorySeeder = app.get(CategoriasSeederService);
  const productSeeder = app.get(ProductosSeederService);
  const buyerSeeder = app.get(CompradoresSeederService);
  const operatorSeeder = app.get(OperadoresSeederService);
  const pedidoSeeder = app.get(PedidosSeederService);

  await manufacterSeeder.seed();
  await categorySeeder.seed();
  await productSeeder.seed();
  await buyerSeeder.seed();
  await operatorSeeder.seed();
  await pedidoSeeder.seed();

  console.log('¡Base de datos sembrenada!');
  await app.close();
  process.exit(1);
}

seed().catch((error) => {
  console.error('Error al correr el script:', error);
  process.exit(1);
});
