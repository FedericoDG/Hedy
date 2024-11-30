import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  mongo: {
    host: process.env.MONGO_HOST,
    port: parseInt(process.env.MONGO_INITDB_PORT, 10),
    user: process.env.MONGO_INITDB_ROOT_USERNAME,
    password: process.env.MONGO_INITDB_ROOT_PASSWORD,
    database: process.env.MONGO_INITDB_DATABASE,
    connection: process.env.MONGO_CONNECTION,
  },
  apiKey: process.env.APIKEY,
  jwtSecret: process.env.JWTSECRET,
}));
