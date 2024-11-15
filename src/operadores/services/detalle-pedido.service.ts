import { Injectable } from '@nestjs/common';

import { CrearDetallePedidoDto } from '../dtos/detalle-pedido-crear.dto';

@Injectable()
export class DetallePedidoService {
  constructor() {}

  async create(orderDetails: CrearDetallePedidoDto) {
    return 'detalle pedido create';
  }
  async delete(id: number) {
    return 'detalle pedido delete';
  }
}
