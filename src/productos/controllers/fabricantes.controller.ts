import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Role } from '../../auth/models/role.model';
import { ActualizarFabricanteDto } from '../dtos/fabricante-actualizar.dto';
import { CrearFabricanteDto } from '../dtos/fabricante-crear.dto';
import { FabricantesService } from '../services/fabricantes.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('fabricantes')
@ApiTags('Fabricantes')
export class FabricantesController {
  constructor(private readonly manufacturerService: FabricantesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Lista todos los fabricantes' })
  findAll() {
    return this.manufacturerService.findAll();
  }

  @Public()
  @Get('/:id')
  @ApiOperation({ summary: 'Lista un solo fabicante, por id' })
  findOne(@Param('id') id: string) {
    return this.manufacturerService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Crea un nuevo fabricante' })
  create(@Body() manufacter: CrearFabricanteDto) {
    return this.manufacturerService.create(manufacter);
  }

  @Roles(Role.ADMIN)
  @Patch('/:id')
  @ApiOperation({ summary: 'Actualiza un fabricante' })
  update(@Param('id') id: string, @Body() body: ActualizarFabricanteDto) {
    const upodatedManufacturer = this.manufacturerService.update(id, body);
    return upodatedManufacturer;
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un fabricante' })
  delete(@Param('id') id: string): Record<string, any> {
    this.manufacturerService.delete(id);

    return {
      message: `Fabricante con id ${id} eliminado`,
    };
  }
}
