import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';

import { Fabricante } from './fabricante.entity';

@Schema({
  collection: 'productos',
})
export class Producto extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop({ type: Number, index: true })
  precio: number;

  @Prop({ type: Number })
  stock: number;

  @Prop()
  origen: string;

  @Prop()
  imagen: string;

  @Prop(
    raw({
      nombre: { type: String },
      imagen: { type: String },
    }),
  )
  categoria: Record<string, any>;

  @Prop({ type: Types.ObjectId, ref: Fabricante.name })
  fabricante: Fabricante | Types.ObjectId;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
