import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Compradores')
@Controller('compradores')
export class CompradoresController {}
