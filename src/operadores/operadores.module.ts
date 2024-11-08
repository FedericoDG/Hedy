import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompradoresSeederService } from '../database/seeds/comprador.seeder';
import { OperadoresSeederService } from '../database/seeds/operador.seeder';
import { PedidosSeederService } from '../database/seeds/pedido.seeder';
import { ProductosModule } from '../productos/productos.module';
import { CompradoresController } from './controllers/compradores.controller';
import { DetallePedidoController } from './controllers/detalle-pedido.controller';
import { OperadoresController } from './controllers/operadores.controller';
import { PedidosController } from './controllers/pedidos.controller';
import { Comprador } from './entities/comprador.entity';
import { DetallePedido } from './entities/detalle-pedido.entity';
import { Operador } from './entities/operador.entity';
import { Pedido } from './entities/pedido.entity';
import { CompradoresService } from './services/compradores.service';
import { DetallePedidoService } from './services/detalle-pedido.service';
import { OperadoresService } from './services/operadores.service';
import { PedidosService } from './services/pedidos.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comprador, Operador, Pedido, DetallePedido]),
    ProductosModule,
  ],
  controllers: [
    CompradoresController,
    OperadoresController,
    PedidosController,
    DetallePedidoController,
  ],
  providers: [
    CompradoresService,
    OperadoresService,
    PedidosService,
    CompradoresSeederService,
    OperadoresSeederService,
    PedidosSeederService,
    DetallePedidoService,
  ],
})
export class OperadoresModule {}
