import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'categorias',
  /*  toObject: {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
    },
  }, */
})
export class Categoria extends Document {
  @Prop()
  nombre: string;
}
export const CategoriaSchema = SchemaFactory.createForClass(Categoria);
