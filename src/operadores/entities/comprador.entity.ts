import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'compradores',
  /*  toObject: {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
    },
  }, */
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
