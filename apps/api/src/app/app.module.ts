import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {SwaggerModule} from "@nestjs/swagger";

import {DatabaseModule} from "./schemas/database.module";
import {ProblemService} from "./services/problem/problem.service";
import {ProblemController} from "./controllers/problem/problem.controller";
import {SolutionController} from "./controllers/solution/solution.controller";
import {TestService} from "./services/test/test.service";
import {SolutionService} from "./services/solution/solution.service";

const databaseHost = process.env.DB_HOST || 'localhost';
const databasePort = process.env.DB_PORT || 27018;
const databaseName = process.env.DB_NAME || 'learn_to_code';

console.log(`database: [mongodb://${databaseHost}:${databasePort}/${databaseName}]`);

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${databaseHost}:${databasePort}/${databaseName}`),
    DatabaseModule,
    SwaggerModule
  ],
  controllers: [ProblemController, SolutionController],
  providers: [ProblemService, TestService, SolutionService],
})
export class AppModule {
}
