import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

import {Test, TestDocument} from "../../schemas/test.schema";

@Injectable()
export class TestService {
  constructor(@InjectModel(Test.name) private testModel: Model<TestDocument>) {
  }

  async create(inputFile: string, outputFile: string, problemId: string): Promise<Test> {
    const test = new this.testModel(
      {
        inputFileName: inputFile,
        outputFileName: outputFile,
        problem: problemId
      }
    );
    return test.save();
  }

  async findTestsByProblemId(problemId: string): Promise<Test[]> {
    return this.testModel.aggregate([{$match: {problem: problemId}}]);
  }
}
