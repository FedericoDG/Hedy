import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ActualizarCompradorDto } from '../dtos/comprador-actualizar.dto';
import { CrearCompradorDto } from '../dtos/comprador-crear.dto';
import { CompradoresService } from '../services/compradores.service';

@ApiTags('Compradores')
@Controller('compradores')
export class CompradoresController {
  constructor(private readonly buyerService: CompradoresService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos los compradores' })
  findAll() {
    return this.buyerService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Lista un solo comprador, por id' })
  findOne(@Param('id') id: string) {
    return this.buyerService.findOne(parseInt(id));
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo comprador' })
  create(@Body() buyer: CrearCompradorDto) {
    return this.buyerService.create(buyer);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Actualiza un comprador' })
  update(@Param('id') id: string, @Body() body: ActualizarCompradorDto) {
    const upodatedProduct = this.buyerService.update(parseInt(id), body);

    return upodatedProduct;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un comprador' })
  delete(@Param('id') id: string): Record<string, any> {
    this.buyerService.delete(parseInt(id));

    return {
      message: `Comprador con id ${id} eliminado`,
    };
  }
}
