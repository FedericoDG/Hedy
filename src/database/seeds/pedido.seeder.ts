import { In, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Comprador } from '../../operadores/entities/comprador.entity';
import { DetallePedido } from '../../operadores/entities/detalle-pedido.entity';
import { Pedido } from '../../operadores/entities/pedido.entity';
import { Producto } from '../../productos/entities/producto.entity';

const pedidos = [
  {
    compradorId: 1,
    date: new Date(),
    detalles: [
      { productoId: 1, cantidad: 1, precio: 100.11 },
      { productoId: 2, cantidad: 2, precio: 200.22 },
    ],
  },
  {
    compradorId: 2,
    date: new Date(),
    detalles: [
      { productoId: 3, cantidad: 3, precio: 300.33 },
      { productoId: 4, cantidad: 4, precio: 400.44 },
    ],
  },
];

@Injectable()
export class PedidosSeederService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(Comprador)
    private readonly compradorRepository: Repository<Comprador>,
    @InjectRepository(DetallePedido)
    private readonly detallePedidoRepository: Repository<DetallePedido>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async seed() {
    try {
      const count = await this.pedidoRepository.count();
      console.log(`Pedidos existentes: ${count}`);

      if (count > 0) {
        await this.pedidoRepository.query(`TRUNCATE TABLE pedido RESTART IDENTITY CASCADE;`);
        console.log('Pedidos eliminados');
      }

      const compradores = await this.compradorRepository.find({
        where: { id: In([1, 2]) },
      });

      const productos = await this.productoRepository.find({
        where: { id: In([1, 2, 3, 4]) },
      });

      // Crear pedidos con detalles
      await Promise.all(
        pedidos.map(async (pedidoData) => {
          const comprador = compradores.find((c) => c.id === pedidoData.compradorId);

          if (!comprador) {
            console.log(`Comprador no encontrado para el pedido con fecha: ${pedidoData.date}`);
            return null;
          }

          // Crea el pedido sin detalles por ahora
          const pedido = this.pedidoRepository.create({
            comprador,
            date: pedidoData.date,
          });

          // Guardar el pedido primero para obtener su ID
          const savedPedido = await this.pedidoRepository.save(pedido);

          // Crear detalles del pedido y asociarlos al pedido creado
          const detalles = await Promise.all(
            pedidoData.detalles.map((detalle) => {
              const producto = productos.find((p) => p.id === detalle.productoId);
              if (!producto) {
                console.log(`Producto no encontrado para el detalle con ID: ${detalle.productoId}`);
                return null;
              }

              const detallePedido = this.detallePedidoRepository.create({
                producto,
                cantidad: detalle.cantidad,
                precio: detalle.precio,
                pedido: savedPedido, // Asegúrate de asociar el pedido
              });
              return this.detallePedidoRepository.save(detallePedido);
            }),
          );

          savedPedido.detalles = detalles.filter((d) => d !== null); // Asignar detalles al pedido
          return savedPedido;
        }),
      );

      console.log('Pedidos cargados correctamente');
    } catch (error) {
      console.error('Error cargando pedidos:', error);
    }
  }
}
