import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class ActualizarCategoriaProductoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  imagen: string;
}
