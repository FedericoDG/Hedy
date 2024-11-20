import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductosModule } from '../productos/productos.module';
import { CompradoresController } from './controllers/compradores.controller';
import { DetallePedidoController } from './controllers/detalle-pedido.controller';
import { OperadoresController } from './controllers/operadores.controller';
import { PedidosController } from './controllers/pedidos.controller';
import { Comprador, CompradorSchema } from './entities/comprador.entity';
import { DetallePedido, DetallePedidoSchema } from './entities/detalle-pedido.entity';
import { Operador, OperadorSchema } from './entities/operador.entity';
import { Pedido, PedidoSchema } from './entities/pedido.entity';
import { CompradoresService } from './services/compradores.service';
import { DetallePedidoService } from './services/detalle-pedido.service';
import { OperadoresService } from './services/operadores.service';
import { PedidosService } from './services/pedidos.service';

@Module({
  imports: [
    ProductosModule,
    MongooseModule.forFeature([
      { name: Operador.name, schema: OperadorSchema },
      { name: Comprador.name, schema: CompradorSchema },
      { name: Pedido.name, schema: PedidoSchema },
      { name: DetallePedido.name, schema: DetallePedidoSchema },
    ]),
  ],
  controllers: [
    CompradoresController,
    OperadoresController,
    PedidosController,
    DetallePedidoController,
  ],
  providers: [CompradoresService, OperadoresService, PedidosService, DetallePedidoService],
})
export class OperadoresModule {}
