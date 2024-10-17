import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUrl,
  IsPositive,
} from 'class-validator';

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
  image: string;
}
