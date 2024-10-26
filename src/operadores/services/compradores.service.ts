import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ActualizarCompradorDto } from '../dtos/comprador-actualizar.dto';
import { CrearCompradorDto } from '../dtos/comprador-crear.dto';
import { Comprador } from '../entities/comprador.entity';

@Injectable()
export class CompradoresService {
  constructor(
    @InjectRepository(Comprador)
    private readonly buyerRepository: Repository<Comprador>,
  ) {}

  async findAll() {
    return await this.buyerRepository.find();
  }

  async findOne(id: number) {
    const buyer = await this.buyerRepository.findOneBy({ id });

    if (!buyer) throw new NotFoundException(`No existe el comprador con id: ${id}`);

    return buyer;
  }

  async create(buyer: CrearCompradorDto) {
    const newBuyer = this.buyerRepository.create(buyer);

    return await this.buyerRepository.save(newBuyer);
  }

  async update(id: number, updatedBuyer: ActualizarCompradorDto) {
    const buyer = await this.buyerRepository.findOneBy({ id });

    if (!buyer) throw new NotFoundException(`No existe el comprador con id: ${id}`);

    this.buyerRepository.merge(buyer, updatedBuyer);

    return await this.buyerRepository.save(buyer);
  }

  delete(id: number) {
    return this.buyerRepository.delete(id);
  }
}
