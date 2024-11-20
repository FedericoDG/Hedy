import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

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
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.pedidoService.findOne(id);
  }

  @Post()
  create(@Body() order: CrearPedidoDto) {
    return this.pedidoService.create(order);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() order: ActualizarPedidoDto) {
    return this.pedidoService.update(id, order);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: string) {
    this.pedidoService.delete(id);

    return {
      message: `Pedido  con id ${id} eliminado`,
    };
  }
}
