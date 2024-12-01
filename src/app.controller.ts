import { Controller } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @SetMetadata('isPublic', true)
  /*   @UseGuards(ApiKeyGuard)
  @Get('nuevo')
  newEndpoint() {
    return 'Soy un nuevo endpoint';
  } */
}
