import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Problem, ProblemSchema} from "./problem.schema";
import {Test, TestSchema} from "./test.schema";
import {Solution, SolutionSchema} from "./solution.schema";
import {User, UserSchema} from "./user.schema";

@Module({
  imports: [MongooseModule.forFeature([
    {name: Problem.name, schema: ProblemSchema},
    {name: Test.name, schema: TestSchema},
    {name: Solution.name, schema: SolutionSchema},
    {name: User.name, schema: UserSchema},
  ])],
  exports: [MongooseModule]
})
export class DatabaseModule {
}
