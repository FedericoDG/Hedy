import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FabricantesController } from './controller/fabricantes.controller';
import { ProductosController } from './controller/productos.controller';
import { PedidosController } from './controller/pedidos.controller';
import { OperadoresController } from './controller/operadores.controller';
import { CompradoresController } from './controller/compradores.controller';
import { CategoriasController } from './controller/categorias.controller';
import { ProdutosService } from './services/produtos.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    FabricantesController,
    ProductosController,
    PedidosController,
    OperadoresController,
    CompradoresController,
    CategoriasController,
  ],
  providers: [AppService, ProdutosService],
})
export class AppModule {}
