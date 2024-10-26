import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ActualizarProductoDto } from '../../productos/dtos/producto-actualizar.dto';
import { CrearProductoDto } from '../../productos/dtos/producto-crear.dto';
import { ProductosService } from '../../productos/services/produtos.service';

@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productService: ProductosService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos los productos' })
  findAll() {
    return this.productService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Lista un solo producto, por id' })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(parseInt(id));
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo producto' })
  create(@Body() producto: CrearProductoDto) {
    return this.productService.create(producto);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Actualiza un producto' })
  update(@Param('id') id: string, @Body() body: ActualizarProductoDto) {
    const upodatedProduct = this.productService.update(parseInt(id), body);

    return upodatedProduct;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un producto' })
  delete(@Param('id') id: string): Record<string, any> {
    this.productService.delete(parseInt(id));

    return {
      message: `Producto con id ${id} eliminado`,
    };
  }
}
