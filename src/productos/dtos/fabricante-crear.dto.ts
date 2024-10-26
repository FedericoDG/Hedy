import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CrearFabricanteDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  direccion: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  imagen: string;
}
