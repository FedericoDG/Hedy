import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ActualizarCategoriaDto } from '../dtos/categoria-actualizar.dto';
import { CrearCategoriaDto } from '../dtos/categoria-crear.dto';
import { CategoriasService } from '../services/categorias.service';

@Controller('categorias')
@ApiTags('Categorías')
export class CategoriasController {
  constructor(private readonly categoryService: CategoriasService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todas las categorías' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Lista un sola categoría, por id' })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(parseInt(id));
  }

  @Post()
  @ApiOperation({ summary: 'Crea una nueva categoría' })
  create(@Body() category: CrearCategoriaDto) {
    return this.categoryService.create(category);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Actualiza una categoría' })
  update(@Param('id') id: string, @Body() body: ActualizarCategoriaDto) {
    const upodatedCategory = this.categoryService.update(parseInt(id), body);

    return upodatedCategory;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina una categoría' })
  delete(@Param('id') id: string): Record<string, any> {
    this.categoryService.delete(parseInt(id));

    return {
      message: `Categoría con id ${id} eliminada`,
    };
  }
}
