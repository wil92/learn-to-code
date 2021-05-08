import {Model} from "mongoose";
import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";

import {Problem, ProblemDocument} from "../../schemas/problem.schema";
import {ProblemDto} from "../../dtos/problem.dto";
import {TestService} from "../test/test.service";

@Injectable()
export class ProblemService {
  constructor(@InjectModel(Problem.name) private problemModel: Model<ProblemDocument>,
              private readonly testService: TestService) {
  }

  async findAll(): Promise<Problem[]> {
    return this.problemModel.find().exec();
  }

  async findOneById(id: string): Promise<Problem> {
    return this.problemModel.findById(id);
  }

  async create(problem: ProblemDto): Promise<Problem> {
    const newProblem =  new this.problemModel(problem);
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

  async solveProblem(id: string): Promise<string> {
    const problem = await this.findOneById(id);

    const tests = this.testService.findTestsByProblemId(id);

    return 'solution code';
  }
}
