import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

Schema({ collection: 'categorias' });
export class Categoria extends Document {
  @Prop()
  nombre: string;
}
export const CategoriaSchema = SchemaFactory.createForClass(Categoria);
