import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';

import { Public } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Role } from '../../auth/models/role.model';
import { MongoIdPipe } from '../../common/mongo-id.pipe';
import { AgregarProductosAPedidoDto } from '../dtos/agregar-productos-a-pedidto.dto';
import { ActualizarPedidoDto } from '../dtos/pedido-actualizar.dto';
import { CrearPedidoDto } from '../dtos/pedido-crear.dto';
import { PedidosService } from '../services/pedidos.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidoService: PedidosService) {}

  @Roles(Role.USER)
  @Get()
  findAll() {
    return this.pedidoService.findAll();
  }

  @Roles(Role.USER)
  @Get(':id')
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.pedidoService.findOne(id);
  }

  @Public()
  @Post()
  create(@Body() order: CrearPedidoDto) {
    return this.pedidoService.create(order);
  }

  @Roles(Role.USER)
  @Patch(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() order: ActualizarPedidoDto) {
    return this.pedidoService.update(id, order);
  }

  @Roles(Role.USER)
  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    this.pedidoService.delete(id);

    return {
      message: `Pedido  con id ${id} eliminado`,
    };
  }

  @Roles(Role.USER)
  @Patch(':orderId/productos')
  addProductsToOrder(
    @Param('orderId', MongoIdPipe) orderId: string,
    @Body() payload: AgregarProductosAPedidoDto,
  ) {
    return this.pedidoService.addProductToOrder(orderId, payload.productoIds);
  }

  @Roles(Role.USER)
  @Delete(':orderId/producto/:productId')
  removeProductFromOrder(
    @Param('orderId', MongoIdPipe) orderId: string,
    @Param('productId', MongoIdPipe) productId: string,
  ) {
    return this.pedidoService.removeProductFromOrder(orderId, productId);
  }
}
