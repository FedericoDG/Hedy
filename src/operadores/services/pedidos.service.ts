import { Model } from 'mongoose';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ActualizarPedidoDto } from '../dtos/pedido-actualizar.dto';
import { CrearPedidoDto } from '../dtos/pedido-crear.dto';
import { Pedido } from '../entities/pedido.entity';

@Injectable()
export class PedidosService {
  constructor(@InjectModel(Pedido.name) private readonly orderRepository: Model<Pedido>) {}

  async findAll() {
    const orders = await this.orderRepository.find().exec();

    return orders.map((order) => ({
      ...order.toObject(),
      _id: order._id.toString(),
    }));
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findById(id).exec();

    if (!order) {
      throw new NotFoundException(`Pedido con id: ${id} no encontrado`);
    }

    return {
      ...order.toObject(),
      _id: order._id.toString(),
    };
  }

  async create(order: CrearPedidoDto) {
    const newOrder = new this.orderRepository(order);
    const savedOrder = await newOrder.save();

    return {
      ...savedOrder.toObject(),
      _id: savedOrder._id.toString(),
    };
  }

  async update(id: string, updatedOrder: ActualizarPedidoDto) {
    const order = await this.orderRepository
      .findByIdAndUpdate(id, updatedOrder, { new: true })
      .exec();

    if (!order) {
      throw new NotFoundException(`Pedido con id: ${id} no encontrado`);
    }

    return {
      ...order.toObject(),
      _id: order._id.toString(),
    };
  }

  async delete(id: string) {
    return await this.orderRepository.findByIdAndDelete(id);
  }
}
