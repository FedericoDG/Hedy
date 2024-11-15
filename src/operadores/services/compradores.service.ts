import { Injectable } from '@nestjs/common';

import { ActualizarCompradorDto } from '../dtos/comprador-actualizar.dto';
import { CrearCompradorDto } from '../dtos/comprador-crear.dto';

@Injectable()
export class CompradoresService {
  constructor() {}

  async findAll() {
    return 'compradores find all';
  }

  async findOne(id: number) {
    return 'comprador find one';
  }

  async create(buyer: CrearCompradorDto) {
    return 'comprador create';
  }

  async update(id: number, updatedBuyer: ActualizarCompradorDto) {
    return 'comprador update';
  }

  delete(id: number) {
    return 'comprador delete';
  }
}
