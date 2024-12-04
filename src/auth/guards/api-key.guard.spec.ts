import { Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';

import config from '../../config';
import { ApiKeyGuard } from './api-key.guard';

describe('ApiKeyGuard', () => {
  let guard: ApiKeyGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiKeyGuard,
        Reflector,
        {
          provide: config.KEY,
          useValue: { apiKey: 'test-api-key' }, // Mockea el valor de `apiKey`
        },
      ],
    }).compile();

    guard = module.get<ApiKeyGuard>(ApiKeyGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
