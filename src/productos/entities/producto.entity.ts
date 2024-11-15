export class Producto {
  _id: number;

  nombre: string;

  descripcion: string;

  precio: number;

  stock: number;

  origen: string;

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
