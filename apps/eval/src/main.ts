/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {Transport} from "@nestjs/microservices";

import { AppModule } from './app/app.module';

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || 6379;

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.REDIS,
    options: {
      url: `redis://${redisHost}:${redisPort}`,
    },
  });
  await app.listen(() => {
    Logger.log(`Microservice is started`);
  });
}

bootstrap();
