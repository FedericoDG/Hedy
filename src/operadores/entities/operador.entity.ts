import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'operadores',
  /* toObject: {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
    },
  }, */
})
export class Operador extends Document {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: string;
}

export const OperadorSchema = SchemaFactory.createForClass(Operador);
