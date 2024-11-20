import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CrearDetallePedidoDto } from '../dtos/detalle-pedido-crear.dto';
import { DetallePedido } from '../entities/detalle-pedido.entity';

@Injectable()
export class DetallePedidoService {
  constructor(
    @InjectModel(DetallePedido.name) private readonly detailsRepository: Model<DetallePedido>,
  ) {}

  async create(orderDetails: CrearDetallePedidoDto) {
    return 'detalle pedido create';
  }
  async delete(id: string) {
    return 'detalle pedido delete';
  }
}
