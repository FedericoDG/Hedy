export class Comprador {
  _id: number;

  nombre: string;

  apellido: string;

  telefono: string;

  /* @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date; */

  /* @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date; */
}
