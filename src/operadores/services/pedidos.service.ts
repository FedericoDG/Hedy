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
    const orders = await this.orderRepository
      .find()
      .populate('comprador')
      .populate({
        path: 'productos',
        model: 'Producto',
      })
      .exec();

    return orders;
  }

  async findOne(id: string) {
    const order = await this.orderRepository
      .findById(id)
      .populate('comprador')
      .populate({
        path: 'productos',
        model: 'Producto',
      })
      .exec();

    if (!order) {
      throw new NotFoundException(`Pedido con id: ${id} no encontrado`);
    }

    return order;
  }

  async create(order: CrearPedidoDto) {
    const newOrder = new this.orderRepository(order);
    const savedOrder = await newOrder.save();

    return savedOrder;
  }

  async update(id: string, updatedOrder: ActualizarPedidoDto) {
    const order = await this.orderRepository
      .findByIdAndUpdate(id, updatedOrder, { new: true })
      .exec();

    if (!order) {
      throw new NotFoundException(`Pedido con id: ${id} no encontrado`);
    }

    return order;
  }

  async delete(id: string) {
    return await this.orderRepository.findByIdAndDelete(id);
  }

  async addProductToOrder(orderId: string, productIds: string[]) {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new NotFoundException(`Pedido con id: ${orderId} no encontrado`);
    }

    productIds.forEach((productId) => {
      order.productos.push(productId);
    });

    return await order.save();
  }

  async removeProductFromOrder(orderId: string, productId: string) {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new NotFoundException(`Pedido con id: ${orderId} no encontrado`);
    }

    order.productos = order.productos.pull(productId);

    return await order.save();
  }
}
