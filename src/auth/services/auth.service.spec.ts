import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { Operador } from '../../operadores/entities/operador.entity';
import { OperadoresService } from '../../operadores/services/operadores.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  // Mock para OperadoresService
  const mockOperadoresService = {
    findByEmail: jest.fn(), // Agrega más métodos según sea necesario
  };

  // Mock para JwtService
  const mockJwtService = {
    sign: jest.fn(), // Agrega más métodos según sea necesario
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: OperadoresService, useValue: mockOperadoresService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a JWT for the given operator', () => {
    // Datos de prueba para el operador
    const mockOperator = {
      id: '1',
      email: 'test@example.com',
      password: 'hashedPassword',
      role: 'admin',
    } as Operador;

    // Configura el mock de JwtService para devolver un token simulado
    mockJwtService.sign.mockReturnValue('mockToken');

    // Llama al método de generación de JWT
    const result = service.generateJWT(mockOperator);

    // Verifica que el método sign de JwtService se haya llamado con los datos correctos
    expect(mockJwtService.sign).toHaveBeenCalledWith({
      role: mockOperator.role,
      sub: mockOperator.id,
    });

    // Verifica que el resultado contenga el token y el operador
    expect(result).toEqual({
      access_token: 'mockToken',
      operador: mockOperator,
    });
  });
});
