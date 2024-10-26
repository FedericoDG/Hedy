import { NestFactory } from '@nestjs/core';

import { AppModule } from '../../app.module';
import { CompradoresSeederService } from '../../operadores/seeds/comprador.seeder';
import { OperadoresSeederService } from '../../operadores/seeds/operador.seeder';
import { CategoriasSeederService } from '../../productos/seeds/categoria.seeder';
import { FabricantesSeederService } from '../../productos/seeds/fabricante.seeder';
import { ProductosSeederService } from '../../productos/seeds/producto.seeder';

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
