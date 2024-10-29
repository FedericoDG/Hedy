import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Producto } from '../../productos/entities/producto.entity';

const products = [
  {
    nombre: 'Producto 1',
    descripcion: 'Descripción del producto 1',
    precio: 100.11,
    stock: 10,
    origen: 'China',
    imagen: 'https://example.com/product1.jpg',
  },
  {
    nombre: 'Producto 2',
    descripcion: 'Descripción del producto 2',
    precio: 200.22,
    stock: 20,
    origen: 'Taiwan',
    imagen: 'https://example.com/producto2.jpg',
  },
  {
    nombre: 'Producto 3',
    descripcion: 'Descripción del producto 3',
    precio: 300.33,
    stock: 30,
    origen: 'Japón',
    imagen: 'https://example.com/producto3.jpg',
  },
  {
    nombre: 'Producto 4',
    descripcion: 'Descripción del producto 4',
    precio: 400.44,
    stock: 40,
    origen: 'Corea del Sur',
    imagen: 'https://example.com/producto4.jpg',
  },
  {
    nombre: 'Producto 5',
    descripcion: 'Descripción del producto 5',
    precio: 500.55,
    stock: 50,
    origen: 'Malasia',
    imagen: 'https://example.com/producto5.jpg',
  },
  {
    nombre: 'Producto 6',
    descripcion: 'Descripción del producto 6',
    precio: 600.66,
    stock: 60,
    origen: 'Singapur',
    imagen: 'https://example.com/producto6.jpg',
  },
  {
    nombre: 'Producto 7',
    descripcion: 'Descripción del producto 7',
    precio: 700.77,
    stock: 70,
    origen: 'Indonesia',
    imagen: 'https://example.com/producto7.jpg',
  },
  {
    nombre: 'Producto 8',
    descripcion: 'Descripción del producto 8',
    precio: 800.88,
    stock: 80,
    origen: 'Vietnam',
    imagen: 'https://example.com/producto8.jpg',
  },
  {
    nombre: 'Producto 9',
    descripcion: 'Descripción del producto 9',
    precio: 900.99,
    stock: 90,
    origen: 'Tailandia',
    imagen: 'https://example.com/producto9jpg',
  },
  {
    nombre: 'Producto 10',
    descripcion: 'Descripción del producto 10',
    precio: 1000.11,
    stock: 100,
    origen: 'Filipinas',
    imagen: 'https://example.com/producto10jpg',
  },
];

@Injectable()
export class ProductosSeederService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async seed() {
    try {
      const count = await this.productoRepository.count();

      if (count > 0) {
        await this.productoRepository.clear();

        await this.productoRepository.query('ALTER SEQUENCE producto_id_seq RESTART WITH 1');
      }

      await this.productoRepository.save(products);
      console.log('Productos cargados correctamente');
    } catch (error) {
      console.error('Error cargando productos:', error);
    }
  }
}
