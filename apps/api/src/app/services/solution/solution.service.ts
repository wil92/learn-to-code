import * as mongoose from "mongoose";
import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

import {Solution, SolutionDocument} from "../../schemas/solution.schema";

export enum ProblemStatus {
  RUNNING = 'RUNNING',
  WRONG_ANSWER = 'WRONG_ANSWER',
  ACCEPT = 'ACCEPT'
}

@Injectable()
export class SolutionService {

  compareTable = new Map<string, number>();

  constructor(@InjectModel(Solution.name) private solutionModel: Model<SolutionDocument>) {
  }

  async createSolution(code: string, language: string, problem: string, user: string): Promise<Solution> {
    const solution = new this.solutionModel({code, language, problem, status: ProblemStatus.RUNNING, user});
    return solution.save();
  }

  async getSolutionById(id: string): Promise<Solution> {
    return this.solutionModel.findById(id);
  }

  async getSolutionByUserAndProblem(problemId: string, userId: string): Promise<Solution[]> {
    return this.solutionModel.aggregate([
      {$match: {problem: mongoose.Types.ObjectId(problemId)}},
      {$match: {user: mongoose.Types.ObjectId(userId)}},
      {$sort: {createdAt: -1}}
    ]).exec();
  }

  async updateSolutionStatus(solutionId: string, status: string): Promise<Solution> {
    const solution = await this.solutionModel.findById(solutionId).exec();
    solution.status = status;
    await this.solutionModel.updateOne({_id: solutionId}, solution);
    return solution;
  }
}
