import { PartialType } from '@nestjs/swagger';

import { CrearCompradorDto } from './comprador-crear.dto';

export class ActualizarCompradorDto extends PartialType(CrearCompradorDto) {}
