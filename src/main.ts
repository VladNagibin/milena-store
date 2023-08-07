import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { static as ExStatic } from 'express';
import fs from 'fs';
import * as path from 'path';
const isDev = process.env.NODE_ENV == 'development';
async function bootstrap() {
  let httpsOptions;
  if (!isDev) {
    const privateKey = fs
      .readFileSync('../../etc/letsencrypt/live/choose-votes.ru/privkey.pem')
      .toString();
    const certificate = fs
      .readFileSync('../../etc/letsencrypt/live/choose-votes.ru/cert.pem')
      .toString();

    httpsOptions = { key: privateKey, cert: certificate };
  }
  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.enableCors();
  if (!isDev) {
    app.use('/', ExStatic(path.join(__dirname, 'public')));
    console.log('production mode');
  }
  await app.listen(isDev ? process.env.DEV_PORT : process.env.PROD_PORT);

  console.log(
    `server is running on:${
      isDev ? process.env.DEV_PORT : process.env.PROD_PORT
    }`,
  );
}
bootstrap();
