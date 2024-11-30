import { Document, Types } from 'mongoose';

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

  @Prop({
    type: [
      {
        calle: { type: String },
        numero: { type: Number },
        ciudad: { type: String },
      },
    ],
  })
  direcciones: Types.Array<Record<string, any>[]>;
}

export const CompradorSchema = SchemaFactory.createForClass(Comprador);
