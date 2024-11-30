import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductosModule } from '../productos/productos.module';
import { CompradoresController } from './controllers/compradores.controller';
import { OperadoresController } from './controllers/operadores.controller';
import { PedidosController } from './controllers/pedidos.controller';
import { Comprador, CompradorSchema } from './entities/comprador.entity';
import { Operador, OperadorSchema } from './entities/operador.entity';
import { Pedido, PedidoSchema } from './entities/pedido.entity';
import { CompradoresService } from './services/compradores.service';
import { OperadoresService } from './services/operadores.service';
import { PedidosService } from './services/pedidos.service';

@Module({
  imports: [
    ProductosModule,
    MongooseModule.forFeature([
      { name: Operador.name, schema: OperadorSchema },
      { name: Comprador.name, schema: CompradorSchema },
      { name: Pedido.name, schema: PedidoSchema },
    ]),
  ],
  controllers: [CompradoresController, OperadoresController, PedidosController],
  providers: [CompradoresService, OperadoresService, PedidosService],
  exports: [OperadoresService],
})
export class OperadoresModule {}
