import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ActualizarFabricanteDto } from '../dtos/fabricante-actualizar.dto';
import { CrearFabricanteDto } from '../dtos/fabricante-crear.dto';
import { Fabricante } from '../entities/fabricante.entity';

@Injectable()
export class FabricantesService {
  constructor(
    @InjectRepository(Fabricante)
    private readonly manufacturerRepository: Repository<Fabricante>,
  ) {}

  async findAll() {
    return await this.manufacturerRepository.find();
  }

  async findOne(id: number) {
    const manufacturer = await this.manufacturerRepository.findOne(id, {
      relations: ['productos'],
    });

    if (!manufacturer) throw new NotFoundException(`No existe el fabricante con id: ${id}`);

    return manufacturer;
  }

  async create(manufacturer: CrearFabricanteDto) {
    const newmanufacturer = this.manufacturerRepository.create(manufacturer);

    return await this.manufacturerRepository.save(newmanufacturer);
  }

  async update(id: number, updatedmanufacturer: ActualizarFabricanteDto) {
    const manufacturer = await this.manufacturerRepository.findOne({ id });

    if (!manufacturer) throw new NotFoundException(`No existe el fabricante con id: ${id}`);

    this.manufacturerRepository.merge(manufacturer, updatedmanufacturer);

    return await this.manufacturerRepository.save(manufacturer);
  }

  delete(id: number) {
    return this.manufacturerRepository.delete(id);
  }
}
