import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { Fabricante } from '../entities/fabricante.entity';
import { FabricantesService } from './fabricantes.service';

describe('FabricantesService', () => {
  let service: FabricantesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FabricantesService,
        {
          provide: getModelToken(Fabricante.name),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            // Añade más métodos si es necesario
          },
        },
      ],
    }).compile();

    service = module.get<FabricantesService>(FabricantesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
