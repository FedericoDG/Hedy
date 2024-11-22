import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { MongoIdPipe } from '../../common/mongo-id.pipe';
import { AgregarProductosAPedidoDto } from '../dtos/agregar-productos-a-pedidto.dto';
import { ActualizarPedidoDto } from '../dtos/pedido-actualizar.dto';
import { CrearPedidoDto } from '../dtos/pedido-crear.dto';
import { PedidosService } from '../services/pedidos.service';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidoService: PedidosService) {}

  @Get()
  findAll() {
    return this.pedidoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.pedidoService.findOne(id);
  }

  @Post()
  create(@Body() order: CrearPedidoDto) {
    return this.pedidoService.create(order);
  }

  @Patch(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() order: ActualizarPedidoDto) {
    return this.pedidoService.update(id, order);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    this.pedidoService.delete(id);

    return {
      message: `Pedido  con id ${id} eliminado`,
    };
  }

  @Patch(':orderId/productos')
  addProductsToOrder(
    @Param('orderId', MongoIdPipe) orderId: string,
    @Body() payload: AgregarProductosAPedidoDto,
  ) {
    return this.pedidoService.addProductToOrder(orderId, payload.productoIds);
  }

  @Delete(':orderId/producto/:productId')
  removeProductFromOrder(
    @Param('orderId', MongoIdPipe) orderId: string,
    @Param('productId', MongoIdPipe) productId: string,
  ) {
    return this.pedidoService.removeProductFromOrder(orderId, productId);
  }
}
