import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Producto } from '../../productos/entities/producto.entity';
import { CrearDetallePedidoDto } from '../dtos/detalle-pedido-crear.dto';
import { DetallePedido } from '../entities/detalle-pedido.entity';
import { Pedido } from '../entities/pedido.entity';

@Injectable()
export class DetallePedidoService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(DetallePedido)
    private readonly detallePedidoRepository: Repository<DetallePedido>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async create(orderDetails: CrearDetallePedidoDto) {
    const order = await this.pedidoRepository.findOne({
      where: { id: orderDetails.pedidoId },
    });
    const product = await this.productoRepository.findOne({
      where: { id: orderDetails.productoId },
    });

    const newOrder = new DetallePedido();
    newOrder.pedido = order;
    newOrder.producto = product;
    newOrder.cantidad = orderDetails.cantidad;
    newOrder.precio = product.precio;
    return this.detallePedidoRepository.save(newOrder);
  }
  async delete(id: number) {
    const detalle = await this.detallePedidoRepository.findOne({
      where: { id },
    });

    if (!detalle) {
      throw new Error('Detalle de pedido no encontrado');
    }

    await this.detallePedidoRepository.remove(detalle);
  }
}
