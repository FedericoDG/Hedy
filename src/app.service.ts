import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from 'src/config';

@Injectable()
export class AppService {
  constructor(
    // @Inject('APIKEY') private readonlyapiKey: string,
    @Inject('TAREA_ASYNC') private readonly tarea: any,
    // private readonly configService: ConfigService,
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
  ) {}

  getApiKey(): string {
    // return `La llave de la aplicación es ${this.apiKey}`;
    // const apiKey = this.configService.get('APIKEY');
    // const dbPassword = this.configService.get('PG_PASSWORD');
    // return `La api-key de la aplicación es ${apiKey} y la contraseña es ${dbPassword}... Pero no le cuentes a nadie!.`;

    const apiKey = this.configService.apiKey;
    const dbPassword = this.configService.postgres.password;
    return `La api-key de la aplicación es ${apiKey} y la contraseña es ${dbPassword}... Pero no le cuentes a nadie!.`;
  }

  getUseFactory(): string {
    console.log(this.tarea); // -> post de  https://jsonplaceholder.typicode.com
    return 'Realizando una tarea asincrona de ejemplo';
  }
}
