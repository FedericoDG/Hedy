import { Module } from '@nestjs/common';
import { CompradoresService } from './services/compradores.service';
import { OperadoresService } from './services/operadores.service';
import { PedidosService } from './services/pedidos.service';
import { OperadoresController } from './controllers/operadores.controller';
import { PedidosController } from './controllers/pedidos.controller';
import { CompradoresController } from './controllers/compradores.controller';
import { ProductosModule } from 'src/productos/productos.module';

@Module({
  imports: [ProductosModule],
  controllers: [CompradoresController, OperadoresController, PedidosController],
  providers: [CompradoresService, OperadoresService, PedidosService],
})
export class OperadoresModule {}
