import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'operadores',
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
