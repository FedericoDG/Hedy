import { Injectable } from '@nestjs/common';

import { ActualizarPedidoDto } from '../dtos/pedido-actualizar.dto';
import { CrearPedidoDto } from '../dtos/pedido-crear.dto';

@Injectable()
export class PedidosService {
  constructor() {}

  async findAll() {
    return 'pedidos find all';
  }
  async findOne(id: number) {
    return 'pedido find one';
  }

  async create(order: CrearPedidoDto) {
    return 'pedido create';
  }

  async update(id: number, updatedOrder: ActualizarPedidoDto) {
    return 'pedido update';
  }

  async delete(id: number) {
    return 'pedido delete';
  }
}
