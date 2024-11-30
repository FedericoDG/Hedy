import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Operador } from '../../operadores/entities/operador.entity';
import { OperadoresService } from '../../operadores/services/operadores.service';
import { PayloadToken } from '../models/payload-token.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly operatorService: OperadoresService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const operator = await this.operatorService.findByEmail(email);

    if (operator) {
      const isMatch = await bcrypt.compare(password, operator.password);

      if (isMatch) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = operator.toObject();
        return rest;
      }
    }

    return null;
  }

  generateJWT(operator: Operador) {
    const payload: PayloadToken = { role: operator.role, sub: operator.id };

    return {
      access_token: this.jwtService.sign(payload),
      operador: operator,
    };
  }
}
