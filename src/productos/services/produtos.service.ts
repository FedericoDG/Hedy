import { Injectable } from '@nestjs/common';

import { ActualizarProductoDto } from '../../productos/dtos/producto-actualizar.dto';
import { CrearProductoDto } from '../../productos/dtos/producto-crear.dto';
import { ProductoFiltrosDto } from '../dtos/producto-filtros.dto';

@Injectable()
export class ProductosService {
  constructor() {}

  async findAll(params: ProductoFiltrosDto) {
    return 'productos find all';
  }

  async findOne(id: number) {
    return 'producto find one';
  }

  async create(product: CrearProductoDto) {
    return 'producto create';
  }

  async update(id: number, updatedProduct: ActualizarProductoDto) {
    return 'producto update';
  }

  delete(id: number) {
    return 'producto delete';
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
