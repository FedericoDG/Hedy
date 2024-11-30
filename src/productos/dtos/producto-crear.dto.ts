import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { ActualizarCategoriaProductoDto } from './producto-actualizar-categoria.dto';

export class CrearProductoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  precio: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  stock: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  origen: string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  imagen: string;

  @ApiProperty()
  @IsMongoId()
  fabricante: string;

  @ApiProperty()
  @ValidateNested() // -> Validar que el DTO de la categoria sea válido
  @IsNotEmpty()
  categoria: ActualizarCategoriaProductoDto;
}
