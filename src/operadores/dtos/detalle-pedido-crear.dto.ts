import { IsNumber, IsPositive } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CrearDetallePedidoDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  pedidoId: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  productoId: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  cantidad: number;
}
