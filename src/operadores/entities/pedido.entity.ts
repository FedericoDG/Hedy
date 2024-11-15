import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Comprador } from './comprador.entity';
import { DetallePedido } from './detalle-pedido.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  date: Date;

  /* @Column({ type: 'decimal', default: 0 })
  total: number; */

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

  @ManyToOne(() => Comprador, (comprador) => comprador.pedidos)
  comprador: Comprador;

  @Exclude()
  @OneToMany(() => DetallePedido, (detalle) => detalle.pedido)
  detalles: DetallePedido[];

  @Expose()
  get totalPedido() {
    if (this.detalles) {
      return this.detalles
        .filter((detalle) => !!detalle)
        .reduce((total, detalle) => total + detalle.precio * detalle.cantidad, 0);
    }
    return 0;
  }

  @Expose()
  get productos() {
    if (this.detalles) {
      return this.detalles
        .filter((detalle) => !!detalle)
        .map((detalle) => ({
          ...detalle.producto,
          cantidad: detalle.cantidad,
        }));
    }
    return [];
  }
}
