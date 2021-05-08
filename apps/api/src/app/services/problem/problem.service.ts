import {Model} from "mongoose";
import {Inject, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {ClientRedis} from "@nestjs/microservices";
import {tap, timeout} from "rxjs/operators";

import {Problem, ProblemDocument} from "../../schemas/problem.schema";
import {ProblemDto} from "../../dtos/problem.dto";
import {TestService} from "../test/test.service";
import {SolutionService} from "../solution/solution.service";

@Injectable()
export class ProblemService {
  constructor(@InjectModel(Problem.name) private problemModel: Model<ProblemDocument>,
              private readonly testService: TestService,
              private readonly solutionService: SolutionService,
              @Inject('REDIS_SERVICE') private readonly redisClient: ClientRedis) {
  }

  async findAll(): Promise<Problem[]> {
    return this.problemModel.find().exec();
  }

  async findOneById(id: string): Promise<Problem> {
    return this.problemModel.findById(id);
  }

  async create(problem: ProblemDto): Promise<Problem> {
    const newProblem = new this.problemModel(problem);
    return newProblem.save();
  }

  async delete(id: string): Promise<Problem> {
    const problemRemoved = await this.findOneById(id);
    await this.problemModel.deleteOne({_id: id});
    return problemRemoved;
  }

  async update(id: string, problem: ProblemDto): Promise<Problem> {
    const editedProblem = await this.findOneById(id);
    editedProblem.title = problem.title;
    editedProblem.description = problem.description;
    editedProblem.inputDescription = problem.inputDescription;
    editedProblem.inputExample = problem.inputExample;
    editedProblem.outputDescription = problem.outputDescription;
    editedProblem.outputExample = problem.outputExample;
    await this.problemModel.updateOne({_id: id}, editedProblem);
    return editedProblem;
  }

  async solveProblem(id: string, code: string, language: string): Promise<string> {
    const problem = await this.findOneById(id);

    const tests = await this.testService.findTestsByProblemId(id);
    const solution = await this.solutionService.createSolution(code, 'python3', problem['_id']);

    // send new solution to redis
    const res = await this.redisClient.send('EVAL_SOLUTION',
      {
        solutionId: solution['_id'],
        code,
        tests: ['001'],
        language
      })
      .pipe(timeout(10000))
      .toPromise();

    console.log('redis response:', res);
    await this.solutionService.updateSolutionStatus(res.solutionId, res.result);

    return res;
  }
}
