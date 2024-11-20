import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'detalle_pedidos' })
export class DetallePedido extends Document {
  @Prop({ type: Number })
  cantidad: number;

  @Prop({ type: Number })
  precio: number;
}

export const DetallePedidoSchema = SchemaFactory.createForClass(DetallePedido);
