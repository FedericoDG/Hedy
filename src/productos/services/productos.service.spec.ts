import { Test, TestingModule } from '@nestjs/testing';

import { Producto } from '../entities/producto.entity';
import { ProductosService } from './productos.service';

describe('ProductosService', () => {
  let service: ProductosService;

  const mockService = {
    productos: [
      {
        _id: '6481e76153cdd52b5dabc201',
        nombre: 'Producto 1',
        descripcion: 'Descripción del producto 1',
        precio: 1000,
        stock: 100,
        origen: 'Argentina',
        imagen: 'https://example.com/producto1.jpg',
      },
      {
        _id: '6481e76153cdd52b5dabc202',
        nombre: 'Producto 2',
        descripcion: 'Descripción del producto 2',
        precio: 2000,
        stock: 200,
        origen: 'México',
        imagen: 'https://example.com/producto2.jpg',
      },
    ],
    findAll: jest.fn(() => mockService.productos),
    findOne: jest.fn((_id) => mockService.productos.find((p: Producto) => p._id === _id)),
    create: jest.fn((producto) => {
      mockService.productos.push(producto);
      return producto;
    }),
    update: jest.fn((_id, updateData) => {
      const producto = mockService.productos.find((p: Producto) => p._id === _id);
      if (!producto) {
        return null;
      }
      Object.assign(producto, updateData);
      return producto;
    }),
    delete: jest.fn((_id) => {
      const index = mockService.productos.findIndex((p: Producto) => p._id === _id);
      if (index === -1) {
        return null;
      }
      const deletedProducto = mockService.productos.splice(index, 1);
      return deletedProducto[0];
    }),
    updateProductCategory: jest.fn((productId, updateCategoryDto) => {
      const producto = mockService.productos.find((p: Producto) => p._id === productId);
      if (!producto) {
        return null;
      }
      producto.categoria = {
        nombre: updateCategoryDto.nombre,
        imagen: updateCategoryDto.imagen,
      };
      return producto;
    }),
  };

  beforeEach(() => {
    mockService.productos = [
      {
        _id: '6481e76153cdd52b5dabc201',
        nombre: 'Producto 1',
        descripcion: 'Descripción del producto 1',
        precio: 1000,
        stock: 100,
        origen: 'Argentina',
        imagen: 'https://example.com/producto1.jpg',
      },
      {
        _id: '6481e76153cdd52b5dabc202',
        nombre: 'Producto 2',
        descripcion: 'Descripción del producto 2',
        precio: 2000,
        stock: 200,
        origen: 'México',
        imagen: 'https://example.com/producto2.jpg',
      },
    ];
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductosService,
        {
          provide: ProductosService,
          useValue: mockService,
        },
      ],
    }).compile();

    service = module.get<ProductosService>(ProductosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a product when findOne is called', async () => {
    const _id = '6481e76153cdd52b5dabc201';
    const result = await service.findOne(_id);
    expect(result).toEqual({
      _id: '6481e76153cdd52b5dabc201',
      nombre: 'Producto 1',
      descripcion: 'Descripción del producto 1',
      precio: 1000,
      stock: 100,
      origen: 'Argentina',
      imagen: 'https://example.com/producto1.jpg',
    });
    expect(mockService.findOne).toHaveBeenCalledWith(_id);
  });

  it('should return the correct number of products when findAll is called', async () => {
    const result = await service.findAll();
    expect(result.length).toBe(2);
    expect(mockService.findAll).toHaveBeenCalled();
  });

  it('should create a new product', () => {
    const newProduct = {
      nombre: 'Producto 11',
      descripcion: 'Descripción del producto 11',
      precio: 11000,
      stock: 1100,
      origen: 'Chile',
      imagen: 'https://example.com/producto11.jpg',
      categoria: {
        nombre: 'Categoría A',
        imagen: 'https://example.com/categoriaA.jpg',
      },
      fabricante: '6481e76153cdd52b5dabc301',
    };
    const result = service.create(newProduct);
    expect(result).toEqual(newProduct);
    expect(mockService.productos.length).toBe(3);
  });

  it('should update an existing product', () => {
    const updateData = { nombre: 'Producto 1 Actualizado' };
    const result = service.update('6481e76153cdd52b5dabc201', updateData);
    expect(result).toEqual({
      _id: '6481e76153cdd52b5dabc201',
      nombre: 'Producto 1 Actualizado',
      descripcion: 'Descripción del producto 1',
      precio: 1000,
      stock: 100,
      origen: 'Argentina',
      imagen: 'https://example.com/producto1.jpg',
    });
  });

  it('should return null if the product does not exist', () => {
    const result = service.update('6481e76153cdd52b5dabc999', { nombre: 'Producto No Existe' });
    expect(result).toBeNull();
  });

  it('should delete an existing product', () => {
    const result = service.delete('6481e76153cdd52b5dabc201');
    expect(result).toEqual({
      _id: '6481e76153cdd52b5dabc201',
      nombre: 'Producto 1',
      descripcion: 'Descripción del producto 1',
      precio: 1000,
      stock: 100,
      origen: 'Argentina',
      imagen: 'https://example.com/producto1.jpg',
    });
    expect(mockService.productos.length).toBe(1);
  });

  it('should return null if the product does not exist', () => {
    const result = service.delete('6481e76153cdd52b5dabc999');
    expect(result).toBeNull();
  });

  it('should update the product category', () => {
    const productId = '6481e76153cdd52b5dabc201';
    const updateCategoryDto = {
      nombre: 'Categoría Actualizada',
      imagen: 'https://example.com/categoria-actualizada.jpg',
    };

    const result = service.updateProductCategory(productId, updateCategoryDto);
    expect(result).toEqual({
      _id: '6481e76153cdd52b5dabc201',
      nombre: 'Producto 1',
      descripcion: 'Descripción del producto 1',
      precio: 1000,
      stock: 100,
      origen: 'Argentina',
      imagen: 'https://example.com/producto1.jpg',
      categoria: {
        nombre: 'Categoría Actualizada',
        imagen: 'https://example.com/categoria-actualizada.jpg',
      },
    });
    expect(mockService.updateProductCategory).toHaveBeenCalledWith(productId, updateCategoryDto);
  });

  it('should return null if the product does not exist when updating category', () => {
    const productId = '6481e76153cdd52b5dabc999';
    const updateCategoryDto = {
      nombre: 'Categoría No Existente',
      imagen: 'https://example.com/categoria-no-existente.jpg',
    };

    const result = service.updateProductCategory(productId, updateCategoryDto);
    expect(result).toBeNull();
  });
});
