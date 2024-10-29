import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Fabricante } from '../../productos/entities/fabricante.entity';

const manufacturers = [
  {
    nombre: 'Fabicante 1',
    direccion: 'Dirección del fabricante 1',
    email: 'fabricante1@example.com',
    imagen: 'https://example.com/fabricante1.jpg',
  },
  {
    nombre: 'Fabicante 2',
    direccion: 'Dirección del fabricante 2',
    email: 'fabricante1@example.com',
    imagen: 'https://example.com/fabricante2.jpg',
  },
  {
    nombre: 'Fabicante 3',
    direccion: 'Dirección del fabricante 3',
    email: 'fabricante1@example.com',
    imagen: 'https://example.com/fabricante3.jpg',
  },
  {
    nombre: 'Fabicante 4',
    direccion: 'Dirección del fabricante 4',
    email: 'fabricante1@example.com',
    imagen: 'https://example.com/fabricante4.jpg',
  },
  {
    nombre: 'Fabicante 5',
    direccion: 'Dirección del fabricante 5',
    email: 'fabricante1@example.com',
    imagen: 'https://example.com/fabricante5.jpg',
  },
];

@Injectable()
export class FabricantesSeederService {
  constructor(
    @InjectRepository(Fabricante)
    private readonly manufacturerRepository: Repository<Fabricante>,
  ) {}

  async seed() {
    try {
      const count = await this.manufacturerRepository.count();

      if (count > 0) {
        await this.manufacturerRepository.clear();

        await this.manufacturerRepository.query('ALTER SEQUENCE fabricante_id_seq RESTART WITH 1');
      }

      await this.manufacturerRepository.save(manufacturers);
      console.log('Fabricantes cargados correctamente');
    } catch (error) {
      console.error('Error cargando fabricantes:', error);
    }
  }
}
