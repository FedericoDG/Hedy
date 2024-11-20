import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import config from '../config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configservice: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, database } = configservice.mongo;
        return {
          uri: `${connection}://${host}:${port}`,
          user,
          pass: password,
          dbName: database,
        };
      },
      inject: [config.KEY],
    }),
  ],
})
export class DatabaseModule {}
