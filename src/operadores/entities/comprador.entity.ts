import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'compradores',
})
export class Comprador extends Document {
  @Prop()
  nombre: string;

  @Prop()
  apellido: string;

  @Prop()
  telefono: string;
}

export const CompradorSchema = SchemaFactory.createForClass(Comprador);
