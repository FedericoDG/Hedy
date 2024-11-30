import { Controller, Get, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { ApiKeyGuard } from './auth/guards/api-key.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @SetMetadata('isPublic', true)
  @UseGuards(ApiKeyGuard)
  @Get('nuevo')
  newEndpoint() {
    return 'Soy un nuevo endpoint';
  }
}
