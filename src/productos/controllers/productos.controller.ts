import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Role } from '../../auth/models/role.model';
import { MongoIdPipe } from '../../common/mongo-id.pipe';
import { ActualizarProductoDto } from '../../productos/dtos/producto-actualizar.dto';
import { CrearProductoDto } from '../../productos/dtos/producto-crear.dto';
import { ActualizarCategoriaProductoDto } from '../dtos/producto-actualizar-categoria.dto';
import { ProductoFiltrosDto } from '../dtos/producto-filtros.dto';
import { ProductosService } from '../services/productos.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productService: ProductosService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Lista todos los productos' })
  findAll(@Query() params: ProductoFiltrosDto) {
    return this.productService.findAll(params);
  }

  @Public()
  @Get('/:id')
  @ApiOperation({ summary: 'Lista un solo producto, por id' })
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.productService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Crea un nuevo producto' })
  create(@Body() producto: CrearProductoDto) {
    return this.productService.create(producto);
  }

  @Roles(Role.ADMIN)
  @Patch('/:id')
  @ApiOperation({ summary: 'Actualiza un producto' })
  update(@Param('id', MongoIdPipe) id: string, @Body() body: ActualizarProductoDto) {
    const upodatedProduct = this.productService.update(id, body);

    return upodatedProduct;
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un producto' })
  delete(@Param('id', MongoIdPipe) id: string): Record<string, any> {
    this.productService.delete(id);

    return {
      message: `Producto con id ${id} eliminado`,
    };
  }

  @Roles(Role.ADMIN)
  @Patch('/:productId/categoria/')
  @ApiOperation({ summary: 'Añade una categoría a un producto' })
  addCategoryToProduct(
    @Param('productId') productId: string,
    @Body() updateCategoryDto: ActualizarCategoriaProductoDto,
  ) {
    return this.productService.updateProductCategory(productId, updateCategoryDto);
  }
}
