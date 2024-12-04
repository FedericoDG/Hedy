import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { Operador } from '../entities/operador.entity';
import { OperadoresService } from './operadores.service';

describe('OperadoresService', () => {
  let service: OperadoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OperadoresService,
        {
          provide: getModelToken(Operador.name),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            // Añade más métodos si es necesario
          },
        },
      ],
    }).compile();

    service = module.get<OperadoresService>(OperadoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
