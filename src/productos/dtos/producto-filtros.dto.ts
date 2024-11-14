import { IsOptional, IsPositive, ValidateIf } from 'class-validator';

export class ProductoFiltrosDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;

  @IsOptional()
  @IsPositive()
  precioMinimo: number;

  @ValidateIf((item) => item.precioMinimo)
  @IsPositive()
  precioMaximo: number;
}
