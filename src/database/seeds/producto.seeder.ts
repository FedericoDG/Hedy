import { In, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Categoria } from '../../productos/entities/categoria.entity';
import { Fabricante } from '../../productos/entities/fabricante.entity';
import { Producto } from '../../productos/entities/producto.entity';

const products = [
  {
    nombre: 'Producto 1',
    descripcion: 'Descripción del producto 1',
    precio: 100.11,
    stock: 10,
    origen: 'China',
    imagen: 'https://example.com/product1.jpg',
    fabricanteId: 1,
    categoriasIds: [1, 2],
  },
  {
    nombre: 'Producto 2',
    descripcion: 'Descripción del producto 2',
    precio: 200.22,
    stock: 20,
    origen: 'Taiwan',
    imagen: 'https://example.com/producto2.jpg',
    fabricanteId: 1,
    categoriasIds: [2, 3],
  },
  {
    nombre: 'Producto 3',
    descripcion: 'Descripción del producto 3',
    precio: 300.33,
    stock: 30,
    origen: 'Japón',
    imagen: 'https://example.com/producto3.jpg',
    fabricanteId: 1,
    categoriasIds: [3, 4],
  },
  {
    nombre: 'Producto 4',
    descripcion: 'Descripción del producto 4',
    precio: 400.44,
    stock: 40,
    origen: 'Corea del Sur',
    imagen: 'https://example.com/producto4.jpg',
    fabricanteId: 2,
    categoriasIds: [4, 5],
  },
  {
    nombre: 'Producto 5',
    descripcion: 'Descripción del producto 5',
    precio: 500.55,
    stock: 50,
    origen: 'Malasia',
    imagen: 'https://example.com/producto5.jpg',
    fabricanteId: 2,
    categoriasIds: [1, 5],
  },
  {
    nombre: 'Producto 6',
    descripcion: 'Descripción del producto 6',
    precio: 600.66,
    stock: 60,
    origen: 'Singapur',
    imagen: 'https://example.com/producto6.jpg',
    fabricanteId: 3,
    categoriasIds: [1, 2],
  },
  {
    nombre: 'Producto 7',
    descripcion: 'Descripción del producto 7',
    precio: 700.77,
    stock: 70,
    origen: 'Indonesia',
    imagen: 'https://example.com/producto7.jpg',
    fabricanteId: 3,
    categoriasIds: [2, 3],
  },
  {
    nombre: 'Producto 8',
    descripcion: 'Descripción del producto 8',
    precio: 800.88,
    stock: 80,
    origen: 'Vietnam',
    imagen: 'https://example.com/producto8.jpg',
    fabricanteId: 4,
    categoriasIds: [3, 4],
  },
  {
    nombre: 'Producto 9',
    descripcion: 'Descripción del producto 9',
    precio: 900.99,
    stock: 90,
    origen: 'Tailandia',
    imagen: 'https://example.com/producto9jpg',
    fabricanteId: 4,
    categoriasIds: [4, 5],
  },
  {
    nombre: 'Producto 10',
    descripcion: 'Descripción del producto 10',
    precio: 1000.11,
    stock: 100,
    origen: 'Filipinas',
    imagen: 'https://example.com/producto10jpg',
    fabricanteId: 5,
    categoriasIds: [1, 5],
  },
];

@Injectable()
export class ProductosSeederService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Fabricante)
    private readonly fabricanteRepository: Repository<Fabricante>,
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async seed() {
    try {
      const count = await this.productoRepository.count();
      console.log(`Productos existentes: ${count}`);

      if (count > 0) {
        await this.productoRepository.query(`TRUNCATE TABLE producto RESTART IDENTITY CASCADE;`);
        console.log('Productos eliminados');
      }

      const fabricantes = await this.fabricanteRepository.find({
        where: {
          id: In([1, 2, 3, 4, 5]),
        },
      });

      if (fabricantes.length === 0) {
        throw new Error('No se encontraron fabricantes con los IDs proporcionados');
      }

      const categorias = await this.categoriaRepository.find({
        where: {
          id: In([1, 2, 3, 4, 5]),
        },
      });

      if (categorias.length === 0) {
        throw new Error('No se encontraron categorías con los IDs proporcionados');
      }

      const productsWithFabricanteAndCategorias = products
        .map((product) => {
          const fabricante = fabricantes.find((f) => f.id === product.fabricanteId);
          if (!fabricante) {
            console.log(`Fabricante no encontrado para el producto: ${product.nombre}`);
            return null;
          }

          const productCategories = categorias.filter((c) => product.categoriasIds.includes(c.id));

          return {
            ...product,
            fabricante, // Asocia el fabricante
            categorias: productCategories, // Asocia las categorías
          };
        })
        .filter((p) => p !== null);

      await this.productoRepository.save(productsWithFabricanteAndCategorias);
      console.log('Productos cargados correctamente');
    } catch (error) {
      console.error('Error cargando productos:', error);
    }
  }
}
