import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ActualizarProductoDto } from '../../productos/dtos/producto-actualizar.dto';
import { CrearProductoDto } from '../../productos/dtos/producto-crear.dto';
import { Producto } from '../../productos/entities/producto.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productRepository: Repository<Producto>,
  ) {}

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) throw new NotFoundException(`No existe el producto con id: ${id}`);

    return product;
  }

  async create(product: CrearProductoDto) {
    const newProduct = this.productRepository.create(product);

    return await this.productRepository.save(newProduct);
  }

  async update(id: number, updatedProduct: ActualizarProductoDto) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) throw new NotFoundException(`No existe el producto con id: ${id}`);

    this.productRepository.merge(product, updatedProduct);

    return await this.productRepository.save(product);
  }

  delete(id: number) {
    return this.productRepository.delete(id);
  }
}
