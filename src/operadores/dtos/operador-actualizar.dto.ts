import { PartialType } from '@nestjs/swagger';

import { CrearOperadorDto } from './operador-crear.dto';

export class ActualizarOperadorDto extends PartialType(CrearOperadorDto) {}
