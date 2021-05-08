import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {SwaggerModule} from "@nestjs/swagger";

import {AppController} from './controllers/app.controller';
import {DatabaseModule} from "./schemas/database.module";
import {ProblemService} from "./services/problem/problem.service";

const databaseHost = process.env.DB_HOST || 'localhost';
const databasePort = process.env.DB_PORT || 27018;
const databaseName = process.env.DB_NAME || 'learn_to_code';

console.log(`mongodb://${databaseHost}:${databasePort}/${databaseName}`);

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${databaseHost}:${databasePort}/${databaseName}`),
    DatabaseModule,
    SwaggerModule
  ],
  controllers: [AppController],
  providers: [ProblemService],
})
export class AppModule {
}
