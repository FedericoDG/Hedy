import { PartialType } from '@nestjs/swagger';

import { CrearCategoriaDto } from './categoria-crear.dto';

export class ActualizarCategoriaDto extends PartialType(CrearCategoriaDto) {}
