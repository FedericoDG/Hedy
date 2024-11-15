import { Injectable } from '@nestjs/common';

import { ActualizarOperadorDto } from '../dtos/operador-actualizar.dto';
import { CrearOperadorDto } from '../dtos/operador-crear.dto';

@Injectable()
export class OperadoresService {
  constructor() {}
  async findAll() {
    return 'operadores find all';
  }

  async findOne(id: number) {
    return 'operador find one';
  }

  async create(operator: CrearOperadorDto) {
    return 'operador create';
  }

  async update(id: number, updatedOperator: ActualizarOperadorDto) {
    return 'operador update';
  }

  delete(id: number) {
    return 'operador delete';
  }
}
