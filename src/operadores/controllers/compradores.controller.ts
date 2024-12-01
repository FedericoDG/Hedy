import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Role } from '../../auth/models/role.model';
import { ActualizarCompradorDto } from '../dtos/comprador-actualizar.dto';
import { CrearCompradorDto } from '../dtos/comprador-crear.dto';
import { CompradoresService } from '../services/compradores.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Compradores')
@Controller('compradores')
export class CompradoresController {
  constructor(private readonly buyerService: CompradoresService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Lista todos los compradores' })
  findAll() {
    return this.buyerService.findAll();
  }

  @Public()
  @Get('/:id')
  @ApiOperation({ summary: 'Lista un solo comprador, por id' })
  findOne(@Param('id') id: string) {
    return this.buyerService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo comprador' })
  create(@Body() buyer: CrearCompradorDto) {
    return this.buyerService.create(buyer);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Actualiza un comprador' })
  update(@Param('id') id: string, @Body() body: ActualizarCompradorDto) {
    const upodatedProduct = this.buyerService.update(id, body);

    return upodatedProduct;
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un comprador' })
  delete(@Param('id') id: string): Record<string, any> {
    this.buyerService.delete(id);

    return {
      message: `Comprador con id ${id} eliminado`,
    };
  }
}
