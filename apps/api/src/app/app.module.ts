import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {SwaggerModule} from "@nestjs/swagger";
import {ClientsModule, Transport} from "@nestjs/microservices";

import {DatabaseModule} from "./schemas/database.module";
import {ProblemService} from "./services/problem/problem.service";
import {ProblemController} from "./controllers/problem/problem.controller";
import {SolutionController} from "./controllers/solution/solution.controller";
import {TestService} from "./services/test/test.service";
import {SolutionService} from "./services/solution/solution.service";
import {TestController} from "./controllers/file/test.controller";

const databaseHost = process.env.DB_HOST || 'localhost';
const databasePort = process.env.DB_PORT || 27018;
const databaseName = process.env.DB_NAME || 'learn_to_code';

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || 6379;

console.log(`database: [mongodb://${databaseHost}:${databasePort}/${databaseName}]`);

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${databaseHost}:${databasePort}/${databaseName}`),
    DatabaseModule,
    SwaggerModule,
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
  controllers: [ProblemController, SolutionController, TestController],
  providers: [ProblemService, TestService, SolutionService],
})
export class AppModule {
}
