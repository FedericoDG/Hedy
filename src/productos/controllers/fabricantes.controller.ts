import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ActualizarFabricanteDto } from '../dtos/fabricante-actualizar.dto';
import { CrearFabricanteDto } from '../dtos/fabricante-crear.dto';
import { FabricantesService } from '../services/fabricantes.service';

@Controller('fabricantes')
@ApiTags('Fabricantes')
export class FabricantesController {
  constructor(private readonly manufacturerService: FabricantesService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos los fabricantes' })
  findAll() {
    return this.manufacturerService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Lista un solo fabicante, por id' })
  findOne(@Param('id') id: string) {
    return this.manufacturerService.findOne(parseInt(id));
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo fabricante' })
  create(@Body() manufacter: CrearFabricanteDto) {
    return this.manufacturerService.create(manufacter);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Actualiza un fabricante' })
  update(@Param('id') id: string, @Body() body: ActualizarFabricanteDto) {
    const upodatedManufacturer = this.manufacturerService.update(parseInt(id), body);
    return upodatedManufacturer;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un fabricante' })
  delete(@Param('id') id: string): Record<string, any> {
    this.manufacturerService.delete(parseInt(id));

    return {
      message: `Fabricante con id ${id} eliminado`,
    };
  }
}
