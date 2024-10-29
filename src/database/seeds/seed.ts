import { NestFactory } from '@nestjs/core';

import { AppModule } from '../../app.module';
import { CategoriasSeederService } from './categoria.seeder';
import { CompradoresSeederService } from './comprador.seeder';
import { FabricantesSeederService } from './fabricante.seeder';
import { OperadoresSeederService } from './operador.seeder';
import { ProductosSeederService } from './producto.seeder';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const productSeeder = app.get(ProductosSeederService);
  const manufacterSeeder = app.get(FabricantesSeederService);
  const categorySeeder = app.get(CategoriasSeederService);
  const buyerSeeder = app.get(CompradoresSeederService);
  const operatorSeeder = app.get(OperadoresSeederService);

  await productSeeder.seed();
  await manufacterSeeder.seed();
  await categorySeeder.seed();
  await buyerSeeder.seed();
  await operatorSeeder.seed();

  console.log('¡Base de datos sembrenada!');
  await app.close();
  process.exit(1);
}

seed().catch((error) => {
  console.error('Error al correr el script:', error);
  process.exit(1);
});
