import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { PedidosService } from '../services/pedidos.service';
import { PedidosController } from './pedidos.controller';

describe('PedidosController', () => {
  let controller: PedidosController;

  const mockProductosService = {
    findOne: jest.fn((_id) => {
      if (_id === '674b7944f7c758a70c72d101') {
        return {
          _id,
          fecha: new Date(),
          comprador: '6481e76153cdd52b5dabc101',
          productos: ['6481e76153cdd52b5dabc202', '6481e76153cdd52b5dabc203'],
        };
      }

      throw new NotFoundException(`Pedido con id ${_id} no encontrado`);
    }),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidosController],
      providers: [
        {
          provide: PedidosService,
          useValue: mockProductosService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<PedidosController>(PedidosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should throw a NotFoundException if the order does not exist', () => {
    try {
      controller.findOne('674b7944f7c758a70c72d999');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Pedido con id 674b7944f7c758a70c72d999 no encontrado');
      expect(mockProductosService.findOne).toHaveBeenCalledWith('674b7944f7c758a70c72d999');
    }
  });

  it('should ensure required data is passed in', () => {
    const dto = {
      // Faltan campos
      comprador: '6481e76153cdd52b5dabc101',
    };
    try {
      controller.create(dto as any);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should use guards for protected routes', () => {
    const guards = Reflect.getMetadata('__guards__', PedidosController); // Inspeccionar la clase
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
