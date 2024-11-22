import { FilterQuery, Model } from 'mongoose';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ActualizarProductoDto } from '../../productos/dtos/producto-actualizar.dto';
import { CrearProductoDto } from '../../productos/dtos/producto-crear.dto';
import { ProductoFiltrosDto } from '../dtos/producto-filtros.dto';
import { Producto } from '../entities/producto.entity';

@Injectable()
export class ProductosService {
  constructor(@InjectModel(Producto.name) private readonly productRepository: Model<Producto>) {}

  async findAll(params?: ProductoFiltrosDto) {
    let products: any[];
    if (params) {
      const filters: FilterQuery<Producto> = {};
      const { limit, offset, precioMinimo, precioMaximo } = params;
      if (precioMinimo && precioMaximo) filters.precio = { $gte: precioMinimo, $lte: precioMaximo };

      products = await this.productRepository
        .find(filters)
        .populate('fabricante')
        .skip(offset)
        .limit(limit)
        .exec();
    } else {
      products = await this.productRepository.find().populate('fabricante').exec();
    }

    return products;

    /*  return products.map((product) => ({
      ...product.toObject(),
    })); */
  }

  async findOne(id: string) {
    const product = await this.productRepository.findById(id).exec();

    if (!product) {
      throw new NotFoundException(`Producto con id: ${id} no encontrado`);
    }

    return product;
  }

  async create(product: CrearProductoDto) {
    console.log(product);
    const newProduct = new this.productRepository(product);
    const savedProduct = await newProduct.save();

    return savedProduct;
  }

  async update(id: string, updatedProduct: ActualizarProductoDto) {
    const product = await this.productRepository
      .findByIdAndUpdate(id, updatedProduct, { new: true })
      .exec();

    if (!product) {
      throw new NotFoundException(`Producto con id: ${id} no encontrado`);
    }

    return product;
  }

  async delete(id: string) {
    return await this.productRepository.findByIdAndDelete(id);
  }
}

// TODO: Cuando estén las relaciones con Categorias
/*   async removeCategoryByProduct(productId: number, categoryId: number) {
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
} */
