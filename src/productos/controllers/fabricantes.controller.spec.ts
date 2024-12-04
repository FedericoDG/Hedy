import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { FabricantesService } from '../services/fabricantes.service';
import { FabricantesController } from './fabricantes.controller';

describe('FabricantesController', () => {
  let controller: FabricantesController;

  const mockService = {
    findOne: jest.fn((_id) => {
      if (_id === '6481e76153cdd52b5dabc301') {
        return {
          _id,
          nombre: 'Fabricante 1',
          direccion: 'Dirección del fabricante 1',
          email: 'fabricante1@example.com',
          imagen: 'https://example.com/fabricante1.jpg',
        };
      }

      throw new NotFoundException(`Fabricante con id ${_id} no encontrado`);
    }),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FabricantesController],
      providers: [
        {
          provide: FabricantesService,
          useValue: mockService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<FabricantesController>(FabricantesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should throw a NotFoundException if the manufacter does not exist', () => {
    try {
      controller.findOne('6481e76153cdd52b5dabc999');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Fabricante con id 6481e76153cdd52b5dabc999 no encontrado');
      expect(mockService.findOne).toHaveBeenCalledWith('6481e76153cdd52b5dabc999');
    }
  });

  it('should ensure required data is passed in', () => {
    const dto = {
      // Faltan campos
      Nombre: 'Nombre del fabricante',
    };
    try {
      controller.create(dto as any);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should have @Roles decorator on protected routes', () => {
    const metadata = Reflect.getMetadata('roles', controller.create);
    expect(metadata).toContain('admin');
  });

  it('should use guards for protected routes', () => {
    const guards = Reflect.getMetadata('__guards__', FabricantesController); // Inspeccionar la clase
    expect(guards).toBeDefined(); // Asegura que existen guards en la clase
    if (guards) {
      const isUsingJwtGuard = guards.some((guard) => guard === JwtAuthGuard);
      const isUsingRolesGuard = guards.some((guard) => guard === RolesGuard);

      expect(isUsingJwtGuard).toBeTruthy();
      expect(isUsingRolesGuard).toBeTruthy();
    } else {
      fail('Guards are not defined on the class');
    }
  });
});
