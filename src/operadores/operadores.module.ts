import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductosModule } from '../productos/productos.module';
import { CompradoresController } from './controllers/compradores.controller';
import { OperadoresController } from './controllers/operadores.controller';
import { PedidosController } from './controllers/pedidos.controller';
import { Comprador } from './entities/comprador.entity';
import { Operador } from './entities/operador.entity';
import { CompradoresSeederService } from './seeds/comprador.seeder';
import { OperadoresSeederService } from './seeds/operador.seeder';
import { CompradoresService } from './services/compradores.service';
import { OperadoresService } from './services/operadores.service';
import { PedidosService } from './services/pedidos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comprador, Operador]), ProductosModule],
  controllers: [CompradoresController, OperadoresController, PedidosController],
  providers: [
    CompradoresService,
    OperadoresService,
    PedidosService,
    CompradoresSeederService,
    OperadoresSeederService,
  ],
})
export class OperadoresModule {}
