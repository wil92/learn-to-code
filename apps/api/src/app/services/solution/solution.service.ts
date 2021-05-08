import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

import {Solution, SolutionDocument} from "../../schemas/solution.schema";

@Injectable()
export class SolutionService {
  constructor(@InjectModel(Solution.name) private solutionModel: Model<SolutionDocument>) {
  }

  async createSolution(code: string, language: string, problem: string): Promise<Solution> {
    const solution = new this.solutionModel({code, language, problem, status: 'RUNNING'});
    return solution.save();
  }

  async getSolutionById(id: string): Promise<Solution> {
    return this.solutionModel.findById(id);
  }

  async updateSolutionStatus(solutionId: string, status: string): Promise<Solution> {
    const solution = await this.solutionModel.findById(solutionId).exec();
    solution.status = status;
    this.solutionModel.updateOne({_id: solutionId}, solution);
    return solution;
  }
}
