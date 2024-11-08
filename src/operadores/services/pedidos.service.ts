import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ActualizarPedidoDto } from '../dtos/pedido-actualizar.dto';
import { CrearPedidoDto } from '../dtos/pedido-crear.dto';
import { Comprador } from '../entities/comprador.entity';
import { Pedido } from '../entities/pedido.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido) private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(Comprador) private readonly compradorRepository: Repository<Comprador>,
  ) {}

  async findAll() {
    return this.pedidoRepository.find();
  }
  async findOne(id: number) {
    const order = await this.pedidoRepository.findOne({
      where: { id },
      relations: ['detalles', 'detalles.producto'],
    });

    if (!order) {
      throw new NotFoundException(`No existe el pedido con id: ${id}`);
    }

    return order;
  }

  async create(order: CrearPedidoDto) {
    const newOrder = new Pedido();

    if (order.compradorId) {
      const customer = await this.compradorRepository.findOne({
        where: { id: order.compradorId },
      });
      newOrder.comprador = customer;
    }

    newOrder.date = new Date();

    return this.pedidoRepository.save(newOrder);
  }

  async update(id: number, updatedOrder: ActualizarPedidoDto) {
    const order = await this.pedidoRepository.findOne({ id });

    if (!order) throw new NotFoundException(`No existe el pedido con id: ${id}`);

    if (updatedOrder.compradorId) {
      const customer = await this.compradorRepository.findOne({
        where: { id: updatedOrder.compradorId },
      });

      order.comprador = customer;
    }

    return this.pedidoRepository.save(order);
  }

  async delete(id: number) {
    const order = await this.pedidoRepository.findOne({ id });

    if (!order) throw new NotFoundException(`No existe el pedido con id: ${id}`);

    return this.pedidoRepository.remove(order);
  }
}
