import {Model} from "mongoose";
import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";

import {Problem, ProblemDocument} from "../../schemas/problem.schema";

@Injectable()
export class ProblemService {
  constructor(@InjectModel(Problem.name) private problemModel: Model<ProblemDocument>) {
  }

  async findAll(): Promise<Problem[]> {
    return this.problemModel.find().exec();
  }
}
