import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Categoria } from '../../productos/entities/categoria.entity';

const categories = [
  {
    nombre: 'Categoría 1',
  },
  {
    nombre: 'Categoría 2',
  },
  {
    nombre: 'Categoría 3',
  },
  {
    nombre: 'Categoría 4',
  },
  {
    nombre: 'Categoría 5',
  },
];

@Injectable()
export class CategoriasSeederService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoryRepository: Repository<Categoria>,
  ) {}

  async seed() {
    try {
      const count = await this.categoryRepository.count();

      if (count > 0) {
        await this.categoryRepository.query(`TRUNCATE TABLE categoria RESTART IDENTITY CASCADE;`);
      }

      await this.categoryRepository.save(categories);
      console.log('Categorías cargadas correctamente');
    } catch (error) {
      console.error('Error cargando categorías:', error);
    }
  }
}
