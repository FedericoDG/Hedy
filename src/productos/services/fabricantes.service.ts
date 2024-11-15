import { Injectable } from '@nestjs/common';

import { ActualizarFabricanteDto } from '../dtos/fabricante-actualizar.dto';
import { CrearFabricanteDto } from '../dtos/fabricante-crear.dto';

@Injectable()
export class FabricantesService {
  constructor() {}

  async findAll() {
    return 'fabricantes find all';
  }

  async findOne(id: number) {
    return 'fabricante find one';
  }

  async create(manufacturer: CrearFabricanteDto) {
    return 'fabricante create';
  }

  async update(id: number, updatedmanufacturer: ActualizarFabricanteDto) {
    return 'fabricante update';
  }

  delete(id: number) {
    return 'fabricante delete';
  }
}
