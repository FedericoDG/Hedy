import { Model } from 'mongoose';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ActualizarCompradorDto } from '../dtos/comprador-actualizar.dto';
import { CrearCompradorDto } from '../dtos/comprador-crear.dto';
import { Comprador } from '../entities/comprador.entity';

@Injectable()
export class CompradoresService {
  constructor(@InjectModel(Comprador.name) private readonly buyerRepository: Model<Comprador>) {}

  async findAll() {
    const buyers = await this.buyerRepository.find().exec();

    return buyers;
  }

  async findOne(id: string) {
    const buyer = await this.buyerRepository.findById(id).exec();

    if (!buyer) {
      throw new NotFoundException(`Comprador con id: ${id} no encontrado`);
    }

    return buyer;
  }

  async create(buyer: CrearCompradorDto) {
    const newBuyer = new this.buyerRepository(buyer);
    const savedBuyer = await newBuyer.save();

    return savedBuyer;
  }

  async update(id: string, updatedBuyer: ActualizarCompradorDto) {
    const buyer = await this.buyerRepository
      .findByIdAndUpdate(id, updatedBuyer, { new: true })
      .exec();

    if (!buyer) {
      throw new NotFoundException(`Comprador con id: ${id} no encontrado`);
    }

    return buyer;
  }

  async delete(id: string) {
    return await this.buyerRepository.findByIdAndDelete(id);
  }
}
