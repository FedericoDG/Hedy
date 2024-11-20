import { Model } from 'mongoose';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ActualizarFabricanteDto } from '../dtos/fabricante-actualizar.dto';
import { CrearFabricanteDto } from '../dtos/fabricante-crear.dto';
import { Fabricante } from '../entities/fabricante.entity';

@Injectable()
export class FabricantesService {
  constructor(
    @InjectModel(Fabricante.name) private readonly manufacterRepository: Model<Fabricante>,
  ) {}

  async findAll() {
    const manufacters = await this.manufacterRepository.find().exec();

    return manufacters.map((manufacturer) => ({
      ...manufacturer.toObject(),
      _id: manufacturer._id.toString(),
    }));
  }

  async findOne(id: string) {
    const manufacturer = await this.manufacterRepository.findById(id).exec();

    if (!manufacturer) {
      throw new NotFoundException(`Fabricante con id: ${id} no encontrado`);
    }

    return {
      ...manufacturer.toObject(),
      _id: manufacturer._id.toString(),
    };
  }

  async create(manufacturer: CrearFabricanteDto) {
    const newManufacturer = new this.manufacterRepository(manufacturer);
    const savedManufacturer = await newManufacturer.save();

    return {
      ...savedManufacturer.toObject(),
      _id: savedManufacturer._id.toString(),
    };
  }

  async update(id: string, updatedManufacturer: ActualizarFabricanteDto) {
    const manufacturer = await this.manufacterRepository
      .findByIdAndUpdate(id, updatedManufacturer, { new: true })
      .exec();

    if (!manufacturer) {
      throw new NotFoundException(`Fabricante con id: ${id} no encontrado`);
    }

    return {
      ...manufacturer.toObject(),
      _id: manufacturer._id.toString(),
    };
  }

  async delete(id: string) {
    return await this.manufacterRepository.findByIdAndDelete(id);
  }
}
