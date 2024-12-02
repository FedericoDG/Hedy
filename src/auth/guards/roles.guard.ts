import { Observable } from 'rxjs';

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '../decorators/roles.decorator';
import { PayloadToken } from '../models/payload-token.model';
import { Role } from '../models/role.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());

    if (!roles) {
      return true; // Permite el acceso si no se especifican roles
    }

    const request = context.switchToHttp().getRequest();
    const operator = request.user as PayloadToken;

    if (!operator) {
      throw new UnauthorizedException('Usuario no autenticado');
    }

    const isAuthorized = roles.some((role) => role === operator.role);

    if (!isAuthorized) {
      throw new UnauthorizedException('Permisos insuficientes');
    }

    return isAuthorized;
  }
}
