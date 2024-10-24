import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  postgres: {
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT, 10),
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    name: process.env.PG_NAME,
  },
  apiKey: process.env.APIKEY,
}));
