import { Model } from 'mongoose';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ActualizarCategoriaDto } from '../dtos/categoria-actualizar.dto';
import { CrearCategoriaDto } from '../dtos/categoria-crear.dto';
import { Categoria } from '../entities/categoria.entity';

@Injectable()
export class CategoriasService {
  constructor(@InjectModel(Categoria.name) private readonly categoryRepository: Model<Categoria>) {}

  async findAll() {
    const categories = await this.categoryRepository.find().exec();
    return categories.map((category) => ({
      ...category.toObject(),
      _id: category._id.toString(),
    }));
  }

  async findOne(id: string) {
    const categoty = await this.categoryRepository.findById(id).exec();

    if (!categoty) {
      throw new NotFoundException(`Categoria con id: ${id} no encontrada`);
    }

    return {
      ...categoty.toObject(),
      _id: categoty._id.toString(),
    };
  }

  async create(category: CrearCategoriaDto) {
    const newCategory = new this.categoryRepository(category);
    const savedCategory = await newCategory.save();

    return {
      ...savedCategory.toObject(),
      _id: savedCategory._id.toString(),
    };
  }

  async update(id: string, updatedCategory: ActualizarCategoriaDto) {
    const category = await this.categoryRepository
      .findByIdAndUpdate(id, updatedCategory, { new: true })
      .exec();

    if (!category) {
      throw new NotFoundException(`Categoria con id: ${id} no encontrada`);
    }

    return {
      ...category.toObject(),
      _id: category._id.toString(),
    };
  }

  async delete(id: string) {
    return await this.categoryRepository.findByIdAndDelete(id);
  }
}
