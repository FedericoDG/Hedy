import { Model } from 'mongoose';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ActualizarOperadorDto } from '../dtos/operador-actualizar.dto';
import { CrearOperadorDto } from '../dtos/operador-crear.dto';
import { Operador } from '../entities/operador.entity';

@Injectable()
export class OperadoresService {
  constructor(@InjectModel(Operador.name) private readonly operatorRepository: Model<Operador>) {}

  async findAll() {
    const operators = await this.operatorRepository.find().exec();

    return operators;
  }

  async findOne(id: string) {
    const operator = await this.operatorRepository.findById(id).exec();

    if (!operator) {
      throw new NotFoundException(`Operador con id: ${id} no encontrado`);
    }

    return operator;
  }

  async create(operator: CrearOperadorDto) {
    const newOperator = new this.operatorRepository(operator);
    const savedOperator = await newOperator.save();

    return savedOperator;
  }

  async update(id: string, updatedOperator: ActualizarOperadorDto) {
    const operator = await this.operatorRepository
      .findByIdAndUpdate(id, updatedOperator, { new: true })
      .exec();

    if (!operator) {
      throw new NotFoundException(`Operador con id: ${id} no encontrado`);
    }

    return operator;
  }

  async delete(id: string) {
    return await this.operatorRepository.findByIdAndDelete(id);
  }
}
