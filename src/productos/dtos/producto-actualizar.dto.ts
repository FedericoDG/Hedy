import { PartialType } from '@nestjs/swagger';

import { CrearProductoDto } from './producto-crear.dto';

export class ActualizarProductoDto extends PartialType(CrearProductoDto) {}
