import { Request } from 'express';

import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { Operador } from '../../operadores/entities/operador.entity';
import { AuthService } from '../services/auth.service';

@Controller('auth')
@ApiTags('Autorización')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: Request) {
    const operator = req.user as Operador;
    return this.authService.generateJWT(operator);
  }
}
