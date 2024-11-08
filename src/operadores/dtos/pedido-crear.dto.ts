import { IsNumber, IsPositive } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CrearPedidoDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  compradorId: number;
}
