export class Fabricante {
  _id: number;

  nombre: string;

  direccion: string;

  email: string;

  imagen: string;

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
