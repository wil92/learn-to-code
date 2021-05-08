import {Model} from "mongoose";
import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";

import {Problem, ProblemDocument} from "../../schemas/problem.schema";
import {ProblemDto} from "../../dtos/problem.dto";

@Injectable()
export class ProblemService {
  constructor(@InjectModel(Problem.name) private problemModel: Model<ProblemDocument>) {
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
    const editedProblem =  new this.problemModel(problem);
    editedProblem._id = id;
    editedProblem.id = id;
    return editedProblem.save();
  }

}
