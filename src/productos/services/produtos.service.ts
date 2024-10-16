import { Injectable } from '@nestjs/common';
import { ActualizarProductoDto } from 'src/productos/dtos/producto-actualizar.dto';
import { CrearProductoDto } from 'src/productos/dtos/producto-crear.dto';
import { Producto } from 'src/productos/entities/producto.entity';

@Injectable()
export class ProductosService {
  private idCount = 1;
  private productos: Producto[] = [
    {
      id: 1,
      nombre: 'Producto A',
      descripcion: 'Descripción del producto A',
      precio: 1000,
      stock: 10,
      origen: 'China',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      nombre: 'Producto B',
      descripcion: 'Descripción del producto B',
      precio: 2000,
      stock: 20,
      origen: 'Taiwan',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      nombre: 'Producto C',
      descripcion: 'Descripción del producto C',
      precio: 3000,
      stock: 30,
      origen: 'Corea del Sur',
      image: 'https://via.placeholder.com/150',
    },
  ];

  findAll(): Producto[] {
    return this.productos;
  }

  findOne(id: number): Producto {
    return this.productos.find((p) => p.id === id);
  }

  create(producto: CrearProductoDto): Producto {
    const newProduct = { ...producto, id: this.idCount };
    this.productos.push(newProduct as Producto);
    this.idCount++;
    return newProduct as Producto;
  }

  update(id: number, producto: ActualizarProductoDto): Producto {
    const index = this.productos.findIndex((p) => p.id === id);
    this.productos[index] = { ...this.productos[index], ...producto };
    return this.productos[index];
  }

  remove(id: number): void {
    const index = this.productos.findIndex((p) => p.id === id);
    this.productos.splice(index, 1);
  }
}
