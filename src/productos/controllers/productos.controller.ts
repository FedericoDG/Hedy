import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ActualizarProductoDto } from 'src/productos/dtos/producto-actualizar.dto';
import { CrearProductoDto } from 'src/productos/dtos/producto-crear.dto';
import { Producto } from 'src/productos/entities/producto.entity';
import { ProductosService } from 'src/productos/services/produtos.service';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productService: ProductosService) {}

  @Get()
  getProducts() {
    return this.productService.findAll();
  }

  @Get('/:idProduct')
  getProduct(@Param('idProduct') idProduct: string) {
    return this.productService.findOne(parseInt(idProduct));
  }

  @Post()
  createProduct(@Body() producto: CrearProductoDto): Producto {
    return this.productService.create(producto);
  }

  @Patch('/:idProduct')
  updateProducto(
    @Param('idProduct') idProduct: string,
    @Body() body: ActualizarProductoDto,
  ): Producto {
    const upodatedProduct = this.productService.update(
      parseInt(idProduct),
      body,
    );
    return upodatedProduct;
  }

  @Delete(':idProduct')
  deleteProducto(@Param('idProduct') idProduct: string): Record<string, any> {
    this.productService.remove(parseInt(idProduct));
    return {
      message: 'Producto eliminado',
      idProduct: idProduct,
    };
  }
}
