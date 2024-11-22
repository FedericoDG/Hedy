import { IsArray, IsDate, IsMongoId, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CrearPedidoDto {
  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  fecha: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  comprador: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  productos: string[];
}
