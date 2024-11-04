import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Comprador } from '../../operadores/entities/comprador.entity';

const buyers = [
  {
    nombre: 'Juan',
    apellido: 'Pérez',
    telefono: '+5493516114150',
  },
  {
    nombre: 'Carlos',
    apellido: 'García',
    telefono: '+5493517564940',
  },
  {
    nombre: 'María',
    apellido: 'López',
    telefono: '+5491165749321',
  },
  {
    nombre: 'Roberto',
    apellido: 'Gómez',
    telefono: '+5492668815321',
  },
  {
    nombre: 'Alberto',
    apellido: 'Castro',
    telefono: '+5492666977532',
  },
];

@Injectable()
export class CompradoresSeederService {
  constructor(
    @InjectRepository(Comprador)
    private readonly compradorRepository: Repository<Comprador>,
  ) {}

  async seed() {
    try {
      const count = await this.compradorRepository.count();

      if (count > 0) {
        await this.compradorRepository.query(
          `TRUNCATE TABLE operador, comprador RESTART IDENTITY CASCADE;`,
        );
      }

      await this.compradorRepository.save(buyers);
      console.log('Compradores cargados correctamente');
    } catch (error) {
      console.error('Error cargando compradores:', error);
    }
  }
}
