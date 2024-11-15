import { Module } from '@nestjs/common';

import { ProductosModule } from '../productos/productos.module';
import { CompradoresController } from './controllers/compradores.controller';
import { DetallePedidoController } from './controllers/detalle-pedido.controller';
import { OperadoresController } from './controllers/operadores.controller';
import { PedidosController } from './controllers/pedidos.controller';
import { CompradoresService } from './services/compradores.service';
import { DetallePedidoService } from './services/detalle-pedido.service';
import { OperadoresService } from './services/operadores.service';
import { PedidosService } from './services/pedidos.service';

@Module({
  imports: [ProductosModule],
  controllers: [
    CompradoresController,
    OperadoresController,
    PedidosController,
    DetallePedidoController,
  ],
  providers: [CompradoresService, OperadoresService, PedidosService, DetallePedidoService],
})
export class OperadoresModule {}
