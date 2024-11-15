import { Injectable } from '@nestjs/common';

import { ActualizarCategoriaDto } from '../dtos/categoria-actualizar.dto';
import { CrearCategoriaDto } from '../dtos/categoria-crear.dto';

@Injectable()
export class CategoriasService {
  constructor() {}

  async findAll() {
    return 'categorias find all';
  }

  async findOne(id: number) {
    return 'categoria find one';
  }

  async create(category: CrearCategoriaDto) {
    return 'categoria create';
  }

  async update(id: number, updatedCategory: ActualizarCategoriaDto) {
    return 'categoria update';
  }

  delete(id: number) {
    return 'categoria delete';
  }
}
