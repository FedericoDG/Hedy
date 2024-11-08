import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Producto } from '../../productos/entities/producto.entity';
import { Pedido } from './pedido.entity';

@Entity('detalle_pedido')
export class DetallePedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  cantidad: number;

  @Column('decimal')
  precio: number;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => Producto)
  producto: Producto;

  @ManyToOne(() => Pedido, (pedido) => pedido.detalles)
  pedido: Pedido;
}
