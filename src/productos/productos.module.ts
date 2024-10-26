import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriasController } from './controllers/categorias.controller';
import { FabricantesController } from './controllers/fabricantes.controller';
import { ProductosController } from './controllers/productos.controller';
import { Categoria } from './entities/categoria.entity';
import { Fabricante } from './entities/fabricante.entity';
import { Producto } from './entities/producto.entity';
import { CategoriasSeederService } from './seeds/categoria.seeder';
import { FabricantesSeederService } from './seeds/fabricante.seeder';
import { ProductosSeederService } from './seeds/producto.seeder';
import { CategoriasService } from './services/categorias.service';
import { FabricantesService } from './services/fabricantes.service';
import { ProductosService } from './services/produtos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, Fabricante, Categoria])],
  controllers: [FabricantesController, ProductosController, CategoriasController],
  providers: [
    ProductosService,
    CategoriasService,
    FabricantesService,
    ProductosSeederService,
    FabricantesSeederService,
    CategoriasSeederService,
  ],
  exports: [ProductosService],
})
export class ProductosModule {}
