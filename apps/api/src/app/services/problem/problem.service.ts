import {Model} from "mongoose";
import {Inject, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {ClientRedis} from "@nestjs/microservices";
import {timeout} from "rxjs/operators";

import {Problem, ProblemDocument} from "../../schemas/problem.schema";
import {ProblemDto} from "../../dtos/problem.dto";
import {TestService} from "../test/test.service";
import {ProblemStatus, SolutionService} from "../solution/solution.service";
import {UserService} from "../user/user.service";
import {User} from "../../schemas/user.schema";
import {Solution} from "../../schemas/solution.schema";

@Injectable()
export class ProblemService {
  constructor(@InjectModel(Problem.name) private problemModel: Model<ProblemDocument>,
              private readonly testService: TestService,
              private readonly solutionService: SolutionService,
              private readonly userService: UserService,
              @Inject('REDIS_SERVICE') private readonly redisClient: ClientRedis) {
  }

  async findAll(user: User): Promise<Problem[]> {
    const problems = await this.problemModel.find().exec();
    const resultProblems = [];
    if (user) {
      for (let problem of problems) {
        const solutions = await this.solutionService.getSolutionByUserAndProblem(problem['_id'], user['_id']);
        resultProblems.push({...problem.toObject(), solution: this.relevantSolution(solutions)});
      }
    }
    return resultProblems;
  }

  relevantSolution(solutions: Solution[]) {
    if (solutions.length === 0) {
      return null;
    }
    for (const solution of solutions) {
      if (solution.status === ProblemStatus.ACCEPT) {
        return solution;
      }
    }
    return solutions[solutions.length - 1];
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

  async solveProblem(id: string, code: string, language: string, username: string): Promise<string> {
    const problem = await this.findOneById(id);

    const tests = await this.testService.findTestsByProblemId(id);
    const currentUser = await this.userService.findOne(username);
    const solution = await this.solutionService.createSolution(code, 'python3', problem['_id'], currentUser['_id']);

    // send new solution to redis
    const res = await this.redisClient.send('EVAL_SOLUTION',
      {
        solutionId: solution['_id'],
        code,
        tests: tests.map(test => test.name),
        language
      })
      .pipe(timeout(10000))
      .toPromise();

    console.log('redis response:', res);
    await this.solutionService.updateSolutionStatus(res.solutionId, res.result);

    return res;
  }
}
