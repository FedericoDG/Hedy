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
    let products: Producto[];
    if (params) {
      const filters: FilterQuery<Producto> = {};
      const { limit, offset, precioMinimo, precioMaximo } = params;
      if (precioMinimo && precioMaximo) filters.precio = { $gte: precioMinimo, $lte: precioMaximo };

      products = await this.productRepository.find(filters).skip(offset).limit(limit).exec();
    } else {
      products = await this.productRepository.find().exec();
    }

    return products.map((product) => ({
      ...product.toObject(),
      _id: product._id.toString(),
    }));
  }

  async findOne(id: string) {
    const product = await this.productRepository.findById(id).exec();

    if (!product) {
      throw new NotFoundException(`Producto con id: ${id} no encontrado`);
    }

    return {
      ...product.toObject(),
      _id: product._id.toString(),
    };
  }

  async create(product: CrearProductoDto) {
    const newProduct = new this.productRepository(product);
    const savedProduct = await newProduct.save();

    return {
      ...savedProduct.toObject(),
      _id: savedProduct._id.toString(),
    };
  }

  async update(id: string, updatedProduct: ActualizarProductoDto) {
    const product = await this.productRepository
      .findByIdAndUpdate(id, updatedProduct, { new: true })
      .exec();

    if (!product) {
      throw new NotFoundException(`Producto con id: ${id} no encontrado`);
    }

    return {
      ...product.toObject(),
      _id: product._id.toString(),
    };
  }

  async delete(id: string) {
    return await this.productRepository.findByIdAndDelete(id);
  }
}
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
