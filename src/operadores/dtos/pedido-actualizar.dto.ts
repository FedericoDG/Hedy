import { PartialType } from '@nestjs/swagger';

import { CrearPedidoDto } from './pedido-crear.dto';

export class ActualizarPedidoDto extends PartialType(CrearPedidoDto) {}
