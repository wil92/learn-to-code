import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

import {Solution, SolutionDocument} from "../../schemas/solution.schema";

@Injectable()
export class SolutionService {
  constructor(@InjectModel(Solution.name) private solutionModel: Model<SolutionDocument>) {
  }

  async getSolutionById(id: string): Promise<Solution> {
    return this.solutionModel.findById(id);
  }
}
