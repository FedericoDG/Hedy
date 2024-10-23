import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductosService } from 'src/productos/services/produtos.service';
import { Pedido } from '../entities/pedido.entity';
import { Operador } from '../entities/operador.entity';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

@Injectable()
export class OperadoresService {
  private idCont = 1;
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

  constructor(
    private readonly productsService: ProductosService,
    // @Inject('APIKEY') private apiKey: string,
    private readonly configService: ConfigService,
    @Inject('PG') private readonly clientPg: Client,
  ) {}

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

  getOrderByUser(id: number): Pedido {
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
  }
}
