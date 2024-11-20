import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Producto extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop()
  precio: number;

  @Prop()
  stock: number;

  @Prop()
  origen: string;

  @Prop()
  imagen: string;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
