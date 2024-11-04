import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ActualizarOperadorDto } from '../dtos/operador-actualizar.dto';
import { CrearOperadorDto } from '../dtos/operador-crear.dto';
import { Operador } from '../entities/operador.entity';
import { CompradoresService } from './compradores.service';

@Injectable()
export class OperadoresService {
  constructor(
    //@Inject('PG') private readonly clientPg: Client, //private readonly configService: ConfigService, //private readonly productsService: ProductosService, // @Inject('APIKEY') private apiKey: string,
    @InjectRepository(Operador)
    private readonly operatorRepository: Repository<Operador>,
    private readonly compradorService: CompradoresService,
  ) {}
  async findAll() {
    return await this.operatorRepository.find({
      relations: ['comprador'],
    });
  }

  async findOne(id: number) {
    const operator = await this.operatorRepository.findOne(id, {
      relations: ['comprador'],
    });

    if (!operator) throw new NotFoundException(`No existe el operador con id: ${id}`);

    return operator;
  }

  async create(operator: CrearOperadorDto) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(operator.password, saltRounds);

    if (operator.compradorId) {
      const buyer = await this.compradorService.findOne(operator.compradorId);

      if (!buyer)
        throw new NotFoundException(`No existe el comprador con id: ${operator.compradorId}`);

      operator.compradorId = buyer.id;
    }

    const newOperator = this.operatorRepository.create({
      ...operator,
      password: hashedPassword,
    });

    return await this.operatorRepository.save(newOperator);
  }

  async update(id: number, updatedOperator: ActualizarOperadorDto) {
    const operator = await this.operatorRepository.findOne({ id });
    if (!operator) throw new NotFoundException(`No existe el operador con id: ${id}`);

    if (updatedOperator.password) {
      const saltRounds = 10;
      updatedOperator.password = await bcrypt.hash(updatedOperator.password, saltRounds);
    }

    if (updatedOperator.compradorId) {
      const buyer = await this.compradorService.findOne(updatedOperator.compradorId);

      if (!buyer)
        throw new NotFoundException(
          `No existe el comprador con id: ${updatedOperator.compradorId}`,
        );

      updatedOperator.compradorId = buyer.id;
    }

    this.operatorRepository.merge(operator, updatedOperator);
    return await this.operatorRepository.save(operator);
  }

  delete(id: number) {
    return this.operatorRepository.delete(id);
  }

  /*  private idCont = 1;
  private operadores: Operador[] = [
    {
      id: 1,
      email: 'operator1@example.com',
      password: '123',
      role: 'admin',
    },
    {
      id: 2,
      email: 'operator2@example.com',
      password: '456',
      role: 'user',
    },
    {
      id: 3,
      email: 'operator3@example.com',
      password: '789',
      role: 'user',
    },
  ];
  findAll() {
    const operadores = this.operadores;
    if (!operadores) {
      throw new NotFoundException('No se encuentran operadores');
    }

    const dbHost = this.configService.get('PG_HOST');
    const dbPort = this.configService.get('PG_PORT');
    const dbUser = this.configService.get('PG_USER');
    const dbPassword = this.configService.get('PG_PASSWORD');
    const dbName = this.configService.get('PG_NAME');

    console.log(
      `PG_HOST: ${dbHost}, PG_PORT: ${dbPort}, PG_USER: ${dbUser}, PG_PASSWORD: ${dbPassword}, PG_NAME: ${dbName}`,
    );
    return operadores;
  }

  findOne(id: number): Operador {
    const operador = this.operadores.find((op) => op.id === id);
    if (!operador) {
      throw new NotFoundException(`Operador con ID ${id} no encontrado`);
    }
    return operador;
  }

  createOperador(payload: Operador) {
    this.idCont = this.idCont + 1;
    const newOperador = {
      id: this.idCont,
      ...payload,
    };
    return this.operadores.push(newOperador);
  }

  updateOperador(id: number, payload: Partial<Operador>) {
    const index = this.operadores.findIndex((op) => op.id === id);
    if (index === -1) {
      throw new NotFoundException(`El operador con id: ${id} no se encuentra`);
    }
    this.operadores[index] = {
      ...this.operadores[index],
      ...payload,
    };
    return this.operadores[index];
  }

  async getOrderByUser(id: number) {
    const operador = this.findOne(id);
    return {
      date: new Date(),
      operador,
      products: this.productsService.findAll(),
    };
  }

  deleteOperador(id: number) {
    const index = this.operadores.findIndex((op) => op.id === id);
    if (index === -1) {
      throw new NotFoundException(`El producto con id: ${id} no se encuentra`);
    }
    this.operadores.splice(index, 1);
    return true;
  }
  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tareas', (err, res) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(res.rows);
      });
    });
  } */
}
