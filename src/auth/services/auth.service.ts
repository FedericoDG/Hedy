import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';

import { OperadoresService } from '../../operadores/services/operadores.service';

@Injectable()
export class AuthService {
  constructor(private readonly operatorService: OperadoresService) {}

  async validateUser(email: string, password: string) {
    const operator = await this.operatorService.findByEmail(email);

    if (operator) {
      const isMatch = await bcrypt.compare(password, operator.password);

      if (isMatch) {
        const { password, ...rest } = operator.toObject();
        return rest;
      }
    }

    return null;
  }
}
