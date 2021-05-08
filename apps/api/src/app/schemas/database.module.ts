import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Problem, ProblemSchema} from "./problem.schema";

@Module({
  imports: [MongooseModule.forFeature([{name: Problem.name, schema: ProblemSchema}])],
  exports: [MongooseModule]
})
export class DatabaseModule {
}
