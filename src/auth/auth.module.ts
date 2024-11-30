import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { OperadoresModule } from '../operadores/operadores.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [OperadoresModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
