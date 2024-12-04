import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { CompradoresService } from '../services/compradores.service';
import { CompradoresController } from './compradores.controller';

describe('CompradoresController', () => {
  let controller: CompradoresController;

  const mockProductosService = {
    findOne: jest.fn((_id) => {
      if (_id === '6481e76153cdd52b5dabc101') {
        return {
          _id,
          nombre: 'Juan',
          apellido: 'Pérez',
          telefono: '3517564940',
          direcciones: [
            {
              calle: 'Belgrano',
              numero: '1740',
              ciudad: 'Córdoba',
            },
          ],
        };
      }

      throw new NotFoundException(`Comprador con id ${_id} no encontrado`);
    }),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompradoresController],
      providers: [
        {
          provide: CompradoresService,
          useValue: mockProductosService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<CompradoresController>(CompradoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should throw a NotFoundException if the customer does not exist', () => {
    try {
      controller.findOne('6481e76153cdd52b5dabc999');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Comprador con id 6481e76153cdd52b5dabc999 no encontrado');
      expect(mockProductosService.findOne).toHaveBeenCalledWith('6481e76153cdd52b5dabc999');
    }
  });

  it('should ensure required data is passed in', () => {
    const dto = {
      // Faltan campos
      nombre: 'Descripción del comprador',
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
    const guards = Reflect.getMetadata('__guards__', CompradoresController); // Inspeccionar la clase
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
