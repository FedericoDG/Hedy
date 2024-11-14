import { Between, FindConditions, In, Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ActualizarProductoDto } from '../../productos/dtos/producto-actualizar.dto';
import { CrearProductoDto } from '../../productos/dtos/producto-crear.dto';
import { Producto } from '../../productos/entities/producto.entity';
import { ProductoFiltrosDto } from '../dtos/producto-filtros.dto';
import { Categoria } from '../entities/categoria.entity';
import { Fabricante } from '../entities/fabricante.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productRepository: Repository<Producto>,
    @InjectRepository(Fabricante)
    private readonly fabricanteRepository: Repository<Fabricante>,
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async findAll(params: ProductoFiltrosDto) {
    if (params) {
      const where: FindConditions<Producto> = {};
      const { limit, offset, precioMinimo, precioMaximo } = params;

      if (precioMinimo && precioMaximo) where.precio = Between(precioMinimo, precioMaximo);

      return await this.productRepository.find({
        relations: ['fabricante', 'categorias'],
        take: limit,
        skip: offset,
      });
    }
    return await this.productRepository.find({ relations: ['fabricante', 'categorias'] });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['fabricante', 'categorias'],
    });

    if (!product) throw new NotFoundException(`No existe el producto con id: ${id}`);

    return product;
  }

  async create(product: CrearProductoDto) {
    const newProduct = this.productRepository.create(product);

    if (!product.fabricanteId) {
      const fabricante = await this.fabricanteRepository.findOne({ id: product.fabricanteId });

      if (!fabricante) {
        throw new NotFoundException(`No existe el fabricante con id: ${product.fabricanteId}`);
      }

      newProduct.fabricante = fabricante;
    }

    if (product.categoriasIds && product.categoriasIds.length > 0) {
      const categorias = await this.categoriaRepository.find({
        where: {
          id: In(product.categoriasIds),
        },
      });

      if (categorias.length !== product.categoriasIds.length) {
        throw new NotFoundException('Una o más categorías no existen.');
      }

      newProduct.categorias = categorias;
    }

    return await this.productRepository.save(newProduct);
  }

  async update(id: number, updatedProduct: ActualizarProductoDto) {
    const product = await this.productRepository.findOne({ id });

    if (!product) throw new NotFoundException(`No existe el producto con id: ${id}`);

    this.productRepository.merge(product, updatedProduct);

    return await this.productRepository.save(product);
  }

  delete(id: number) {
    return this.productRepository.delete(id);
  }
  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['categorias'],
    });

    product.categorias = product.categorias.filter((category) => category.id !== categoryId);

    return await this.productRepository.save(product);
  }

  async addCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['categorias'],
    });

    const category = await this.categoriaRepository.findOne({ where: { id: categoryId } });
    product.categorias.push(category);

    return await this.productRepository.save(product);
  }
}
