import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoriasController } from './controllers/categorias.controller';
import { FabricantesController } from './controllers/fabricantes.controller';
import { ProductosController } from './controllers/productos.controller';
import { Categoria, CategoriaSchema } from './entities/categoria.entity';
import { Fabricante, FabricanteSchema } from './entities/fabricante.entity';
import { Producto, ProductoSchema } from './entities/producto.entity';
import { CategoriasService } from './services/categorias.service';
import { FabricantesService } from './services/fabricantes.service';
import { ProductosService } from './services/produtos.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Producto.name, schema: ProductoSchema },
      { name: Fabricante.name, schema: FabricanteSchema },
      { name: Categoria.name, schema: CategoriaSchema },
    ]),
  ],
  controllers: [FabricantesController, ProductosController, CategoriasController],
  providers: [ProductosService, CategoriasService, FabricantesService],
  exports: [ProductosService],
})
export class ProductosModule {}
