import { PartialType } from '@nestjs/mapped-types';
import { CrearProductoDto } from './producto-crear.dto';

export class ActualizarProductoDto extends PartialType(CrearProductoDto) {}
