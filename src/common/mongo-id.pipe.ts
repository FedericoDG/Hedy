import { isMongoId } from 'class-validator';

import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class MongoIdPipe implements PipeTransform {
  transform(value: string) {
    if (!isMongoId(value)) throw new BadRequestException(`${value} no es un id valido de MongoDB`);

    return value;
  }
}
