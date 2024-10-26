import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ActualizarOperadorDto } from '../dtos/operador-actualizar.dto';
import { CrearOperadorDto } from '../dtos/operador-crear.dto';
import { OperadoresService } from '../services/operadores.service';

@Controller('operadores')
@ApiTags('Operadores')
export class OperadoresController {
  constructor(private operatorService: OperadoresService) {}
  @Get()
  @ApiOperation({ summary: 'Lista todos los operadores' })
  findAll() {
    return this.operatorService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Lista un solo operador, por id' })
  findOne(@Param('id') id: string) {
    return this.operatorService.findOne(parseInt(id));
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo operador' })
  create(@Body() operator: CrearOperadorDto) {
    return this.operatorService.create(operator);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Actualiza un operador' })
  update(@Param('id') id: string, @Body() body: ActualizarOperadorDto) {
    const upodatedOperator = this.operatorService.update(parseInt(id), body);

    return upodatedOperator;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un operador' })
  delete(@Param('id') id: string): Record<string, any> {
    this.operatorService.delete(parseInt(id));

    return {
      message: `Operador con id ${id} eliminado`,
    };
  }

  /*  @Get()
  @HttpCode(HttpStatus.ACCEPTED)
  getAllOperators(): any {
    return this.operadoresService.findAll();
  }

  @Get(':id/pedidos')
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.operadoresService.getOrderByUser(id);
  }
  @Get('tareas')
  getTasks() {
    return this.operadoresService.getTasks();
  } */
}
