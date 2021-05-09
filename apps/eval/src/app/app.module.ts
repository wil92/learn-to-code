import {Module} from '@nestjs/common';

import {AppService} from './app.service';
import {AppController} from './app.controller';

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || 6379;

console.log('redis uri:', `redis://${redisHost}:${redisPort}`);

@Module({
  providers: [AppService],
  controllers: [AppController]
})
export class AppModule {
}
