import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ActualizarProductoDto } from 'src/productos/dtos/producto-actualizar.dto';
import { CrearProductoDto } from 'src/productos/dtos/producto-crear.dto';
import { Producto } from 'src/productos/entities/producto.entity';
import { ProductosService } from 'src/productos/services/produtos.service';

@Controller('productos')
@ApiTags('productos')
export class ProductosController {
  constructor(private readonly productService: ProductosService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos los productos' })
  getProducts() {
    return this.productService.findAll();
  }

  @Get('/:idProduct')
  @ApiOperation({ summary: 'Lista un solo producto, por ID' })
  getProduct(@Param('idProduct') idProduct: string) {
    return this.productService.findOne(parseInt(idProduct));
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo producto' })
  createProduct(@Body() producto: CrearProductoDto): Producto {
    return this.productService.create(producto);
  }

  @Patch('/:idProduct')
  @ApiOperation({ summary: 'Actualiza un producto' })
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
  @ApiOperation({ summary: '' })
  deleteProducto(@Param('idProduct') idProduct: string): Record<string, any> {
    this.productService.remove(parseInt(idProduct));
    return {
      message: 'Producto eliminado',
      idProduct: idProduct,
    };
  }
}
