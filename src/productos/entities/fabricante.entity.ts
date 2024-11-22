import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'fabricantes',
  toObject: {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
    },
  },
})
export class Fabricante extends Document {
  @Prop()
  nombre: string;

  @Prop()
  direccion: string;

  @Prop()
  email: string;

  @Prop()
  imagen: string;
}

export const FabricanteSchema = SchemaFactory.createForClass(Fabricante);
