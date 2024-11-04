import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Comprador } from './comprador.entity';

@Entity()
export class Operador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  role: string;

  @JoinColumn()
  @OneToOne(() => Comprador, (comprador) => comprador.operador, {
    nullable: true,
  })
  comprador: Comprador;

  @Column({ name: 'compradorId', nullable: true })
  compradorId: number;
}
