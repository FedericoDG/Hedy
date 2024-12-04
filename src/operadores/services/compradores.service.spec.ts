import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { Comprador } from '../entities/comprador.entity';
import { CompradoresService } from './compradores.service';

describe('CompradoresService', () => {
  let service: CompradoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompradoresService,
        {
          provide: getModelToken(Comprador.name),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            // Añade más métodos si es necesario
          },
        },
      ],
    }).compile();

    service = module.get<CompradoresService>(CompradoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
