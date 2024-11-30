import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { MongoIdPipe } from '../../common/mongo-id.pipe';
import { ActualizarProductoDto } from '../../productos/dtos/producto-actualizar.dto';
import { CrearProductoDto } from '../../productos/dtos/producto-crear.dto';
import { ProductosService } from '../../productos/services/produtos.service';
import { ActualizarCategoriaProductoDto } from '../dtos/producto-actualizar-categoria.dto';
import { ProductoFiltrosDto } from '../dtos/producto-filtros.dto';

@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productService: ProductosService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos los productos' })
  findAll(@Query() params: ProductoFiltrosDto) {
    return this.productService.findAll(params);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Lista un solo producto, por id' })
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.productService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo producto' })
  create(@Body() producto: CrearProductoDto) {
    return this.productService.create(producto);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Actualiza un producto' })
  update(@Param('id', MongoIdPipe) id: string, @Body() body: ActualizarProductoDto) {
    const upodatedProduct = this.productService.update(id, body);

    return upodatedProduct;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un producto' })
  delete(@Param('id', MongoIdPipe) id: string): Record<string, any> {
    this.productService.delete(id);

    return {
      message: `Producto con id ${id} eliminado`,
    };
  }

  @Patch('/:productId/categoria/')
  @ApiOperation({ summary: 'Añade una categoría a un producto' })
  addCategoryToProduct(
    @Param('productId') productId: string,
    @Body() updateCategoryDto: ActualizarCategoriaProductoDto,
  ) {
    return this.productService.updateProductCategory(productId, updateCategoryDto);
  }
}
