import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FabricantesController } from './controllers/fabricantes.controller';
import { ProductosController } from './controllers/productos.controller';
import { Fabricante, FabricanteSchema } from './entities/fabricante.entity';
import { Producto, ProductoSchema } from './entities/producto.entity';
import { FabricantesService } from './services/fabricantes.service';
import { ProductosService } from './services/productos.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Producto.name, schema: ProductoSchema },
      { name: Fabricante.name, schema: FabricanteSchema },
    ]),
  ],
  controllers: [FabricantesController, ProductosController],
  providers: [ProductosService, FabricantesService],
  exports: [ProductosService],
})
export class ProductosModule {}
