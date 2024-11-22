import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CrearCategoriaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  imagen: string;
}
