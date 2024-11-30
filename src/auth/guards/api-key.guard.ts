import { Observable } from 'rxjs';

import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

import config from '../../config';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  @Inject(config.KEY) private readonly configService: ConfigType<typeof config>;

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.header('Auth');
    const isAuthorized = authHeader === this.configService.apiKey;

    if (!isAuthorized) {
      throw new UnauthorizedException('No autorizado');
    }

    return isAuthorized;
  }
}
