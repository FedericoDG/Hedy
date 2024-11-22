import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';

import { Fabricante } from './fabricante.entity';

@Schema({
  collection: 'productos',
  /*  toObject: {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
    },
  },
  toJSON: {
    virtuals: true, // Incluye campos virtuales en la salida JSON
    versionKey: false, // Excluye el campo __v
    transform: (_doc, ret) => {
      ret.id = ret._id.toString(); // Agrega el campo id como string
      delete ret._id; // Elimina el campo _id
    },
  }, */
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
