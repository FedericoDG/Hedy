import { Producto } from '../../productos/entities/producto.entity';
import { Operador } from './operador.entity';

export class Pedido {
  date: Date;
  operador: Operador;
  products: Producto[];
}
