import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Operador } from '../../operadores/entities/operador.entity';

const operators = [
  {
    email: 'operador1@example.com',
    password: '$2b$10$KWJyENB5LoLvb3NGkAPnSu/xT3rW2xn/HB02NZ3R8SemEC/NzOP.G',
    role: 'admin',
    comprador: { id: 1 },
  },
  {
    email: 'operador2@example.com',
    password: '$2b$10$KWJyENB5LoLvb3NGkAPnSu/xT3rW2xn/HB02NZ3R8SemEC/NzOP.G',
    role: 'user',
  },
  {
    email: 'operador3@example.com',
    password: '$2b$10$KWJyENB5LoLvb3NGkAPnSu/xT3rW2xn/HB02NZ3R8SemEC/NzOP.G',
    role: 'user',
  },
];

@Injectable()
export class OperadoresSeederService {
  constructor(
    @InjectRepository(Operador)
    private readonly operadorRepository: Repository<Operador>,
  ) {}

  async seed() {
    try {
      const count = await this.operadorRepository.count();

      if (count > 0) {
        await this.operadorRepository.query(
          `TRUNCATE TABLE operador, comprador RESTART IDENTITY CASCADE;`,
        );
      }

      await this.operadorRepository.save(operators);
      console.log('Operadores cargados correctamente');
    } catch (error) {
      console.error('Error cargando operadores:', error);
    }
  }
}
