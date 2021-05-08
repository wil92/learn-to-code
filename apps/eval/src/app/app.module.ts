import {Module} from '@nestjs/common';
import {ClientsModule, Transport} from "@nestjs/microservices";

import {AppService} from './app.service';
import {AppController} from './app.controller';

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || 6379;

console.log('redis uri:', `redis://${redisHost}:${redisPort}`);

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'REDIS_SERVICE',
        transport: Transport.REDIS,
        options: {
          url: `redis://${redisHost}:${redisPort}`
        }
      }
    ])
  ],
  providers: [AppService],
  controllers: [AppController]
})
export class AppModule {
}
