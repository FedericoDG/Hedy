import { PartialType } from '@nestjs/swagger';

import { CrearFabricanteDto } from './fabricante-crear.dto';

export class ActualizarFabricanteDto extends PartialType(CrearFabricanteDto) {}
