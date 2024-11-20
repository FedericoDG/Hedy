import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'fabricantes' })
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
