import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'pedidos' })
export class Pedido extends Document {
  @Prop()
  date: Date;
}

export const PedidoSchema = SchemaFactory.createForClass(Pedido);
