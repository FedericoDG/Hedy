import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Role } from '../../auth/models/role.model';
import { ActualizarOperadorDto } from '../dtos/operador-actualizar.dto';
import { CrearOperadorDto } from '../dtos/operador-crear.dto';
import { OperadoresService } from '../services/operadores.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('operadores')
@ApiTags('Operadores')
export class OperadoresController {
  constructor(private operatorService: OperadoresService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Lista todos los operadores' })
  findAll() {
    return this.operatorService.findAll();
  }

  @Public()
  @Get('/:id')
  @ApiOperation({ summary: 'Lista un solo operador, por id' })
  findOne(@Param('id') id: string) {
    return this.operatorService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Crea un nuevo operador' })
  create(@Body() operator: CrearOperadorDto) {
    return this.operatorService.create(operator);
  }

  @Roles(Role.ADMIN)
  @Patch('/:id')
  @ApiOperation({ summary: 'Actualiza un operador' })
  update(@Param('id') id: string, @Body() body: ActualizarOperadorDto) {
    const upodatedOperator = this.operatorService.update(id, body);

    return upodatedOperator;
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un operador' })
  delete(@Param('id') id: string): Record<string, any> {
    this.operatorService.delete(id);

    return {
      message: `Operador con id ${id} eliminado`,
    };
  }
}
