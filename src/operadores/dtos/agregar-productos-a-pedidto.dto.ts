import { IsArray, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class AgregarProductosAPedidoDto {
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  productoIds: string[];
}
