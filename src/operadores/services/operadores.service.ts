import * as bcrypt from 'bcrypt';
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

  async findByEmail(email: string) {
    return await this.operatorRepository.findOne({ email }).exec();
  }

  async create(operator: CrearOperadorDto) {
    const newOperator = new this.operatorRepository(operator);
    const hasedPassword = await bcrypt.hash(operator.password, 10);
    newOperator.password = hasedPassword;
    const savedOperator = await newOperator.save();

    const { password, ...rest } = savedOperator.toObject();

    return rest;
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
