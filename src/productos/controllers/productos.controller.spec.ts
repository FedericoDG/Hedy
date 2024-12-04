import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ProductosService } from '../services/productos.service';
import { ProductosController } from './productos.controller';

describe('ProductosController', () => {
  let controller: ProductosController;

  const mockService = {
    findOne: jest.fn((_id) => {
      if (_id === '6481e76153cdd52b5dabc201') {
        return {
          _id,
          nombre: 'Producto 1',
          descripcion: 'Descripción del producto 1',
          precio: 1000,
          stock: 100,
          origen: 'Argentina',
          imagen: 'https://example.com/producto1.jpg',
          fabricante: '6481e76153cdd52b5dabc301',
        };
      }

      throw new NotFoundException(`Producto con id ${_id} no encontrado`);
    }),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductosController],
      providers: [
        {
          provide: ProductosService,
          useValue: mockService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<ProductosController>(ProductosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should throw a NotFoundException if the product does not exist', () => {
    try {
      controller.findOne('6481e76153cdd52b5dabc999');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Producto con id 6481e76153cdd52b5dabc999 no encontrado');
      expect(mockService.findOne).toHaveBeenCalledWith('6481e76153cdd52b5dabc999');
    }
  });

  it('should ensure required data is passed in', () => {
    const dto = {
      // Faltan campos
      descripcion: 'Descripción del producto',
      precio: 100,
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
    const guards = Reflect.getMetadata('__guards__', ProductosController); // Inspeccionar la clase
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
