import { Body, Controller, Delete, Param, Post } from '@nestjs/common';

import { CrearDetallePedidoDto } from '../dtos/detalle-pedido-crear.dto';
import { DetallePedidoService } from '../services/detalle-pedido.service';

@Controller('detalle-pedido')
export class DetallePedidoController {
  constructor(private readonly detallesPedidoService: DetallePedidoService) {}

  @Post()
  create(@Body() orderDetails: CrearDetallePedidoDto) {
    return this.detallesPedidoService.create(orderDetails);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Record<string, any> {
    this.detallesPedidoService.delete(id);

    return {
      message: `Detalle de pedido con id ${id} eliminado`,
    };
  }
}
