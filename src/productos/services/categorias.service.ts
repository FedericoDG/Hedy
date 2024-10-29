import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ActualizarCategoriaDto } from '../dtos/categoria-actualizar.dto';
import { CrearCategoriaDto } from '../dtos/categoria-crear.dto';
import { Categoria } from '../entities/categoria.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoryRepository: Repository<Categoria>,
  ) {}

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({ id });

    if (!category) throw new NotFoundException(`No existe la categoría con id: ${id}`);

    return category;
  }

  async create(category: CrearCategoriaDto) {
    const newCategory = this.categoryRepository.create(category);

    return await this.categoryRepository.save(newCategory);
  }

  async update(id: number, updatedCategory: ActualizarCategoriaDto) {
    const category = await this.categoryRepository.findOne({ id });

    if (!category) throw new NotFoundException(`No existe la categoría con id: ${id}`);

    this.categoryRepository.merge(category, updatedCategory);

    return await this.categoryRepository.save(category);
  }

  delete(id: number) {
    return this.categoryRepository.delete(id);
  }
}
