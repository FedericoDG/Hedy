import { Controller, Param, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { OperadoresService } from '../services/operadores.service';
import { ParseIntPipe } from 'src/common/parse-int.pip';
import { ApiTags } from '@nestjs/swagger';

@Controller('operadores')
@ApiTags('Operadores')
export class OperadoresController {
  constructor(private operadoresService: OperadoresService) {}

  @Get()
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
  }
}
