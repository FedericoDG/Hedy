import * as mongoose from 'mongoose';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

@Injectable()
export class MongooseTransformInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.transformResponse(data)));
  }

  private transformResponse(data: any): any {
    // Si es un array, transformamos cada item
    if (Array.isArray(data)) {
      return data.map((item) => this.transformDocument(item));
    }
    // Si es un solo objeto, lo transformamos ese objeto directamente
    else if (data && typeof data === 'object') {
      return this.transformDocument(data);
    }
    // Si no es objeto ni array, lo devolvemos tal cual estaba
    return data;
  }

  private transformDocument(doc: any): any {
    if (!doc || typeof doc !== 'object') return doc;

    // Si es un documento de mongoose, lo convertimos a objeto plano
    if (doc instanceof mongoose.Document) {
      doc = doc.toObject();
    }

    // Eliminar el campo __v
    delete doc.__v;

    // Si tiene un _id, lo transformamos a id
    if (doc._id) {
      doc.id = doc._id.toString();
      delete doc._id;
    }

    // Recursivamente eliminar __v de subdocumentos y referencias
    for (const key in doc) {
      if (Array.isArray(doc[key])) {
        doc[key] = doc[key].map((item) => this.transformDocument(item));
      } else if (doc[key] && typeof doc[key] === 'object') {
        doc[key] = this.transformDocument(doc[key]);
      }
    }

    return doc;
  }
}
