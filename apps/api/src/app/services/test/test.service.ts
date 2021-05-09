import {Express} from "express";
// noinspection ES6UnusedImports
import { Multer } from 'multer';
import * as mongoose from 'mongoose';
import * as path from "path";
import * as fs from "fs";


import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

import {Test, TestDocument} from "../../schemas/test.schema";

const resourcesPath = process.env.RESOURCES_PATH;

@Injectable()
export class TestService {
  constructor(@InjectModel(Test.name) private testModel: Model<TestDocument>) {
  }

  async uploadFiles(files: Array<Express.Multer.File>, problemId: string) {
    const filesGroup = new Map<string, Array<Express.Multer.File>>();
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.originalname.endsWith('.output') || file.originalname.endsWith('.input')) {
        const fileName = file.originalname.match(/^(.*?)\.(input|output)$/)[1];
        if (!filesGroup.has(fileName)) {
          filesGroup.set(fileName, []);
        }
        filesGroup.get(fileName).push(file);
      }
    }
    for (const group of filesGroup) {
      if (group.length === 2) {
        const newTest = await this.create(this.getRandomId(), problemId);
        await this.extractExtAndSave(group[1][0], problemId, newTest.name);
        await this.extractExtAndSave(group[1][1], problemId, newTest.name);
      }
    }
  }

  async extractExtAndSave(file: Express.Multer.File, problemId: string, filename: string) {
    const fileExt = file.originalname.match(/^(.*?)\.(input|output)$/)[2];
    this.uploadFile(file, `${filename}.${fileExt}`);
  }

  async downloadTestFile(filename: string): Promise<Buffer> {
    const filePath = path.join(resourcesPath, filename);
    return new Promise((resolve, reject) => {
       fs.readFile(filePath, (err, data) => err ? reject(err) : resolve(data));
    });
  }

  uploadFile(file: Express.Multer.File, testName: string) {
    const testFilePath = path.join(resourcesPath, testName);
    fs.writeFileSync(testFilePath, file.buffer);
  }

  async create(name: string, problemId: string): Promise<Test> {
    const test = new this.testModel(
      {
        name,
        problem: problemId
      }
    );
    return test.save();
  }

  async findTestsByProblemId(problemId: string): Promise<Test[]> {
    return this.testModel.aggregate([{$match: {problem: mongoose.Types.ObjectId(problemId)}}]).exec();
  }

  getRandomId(): string {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + '';
  }

  async removeTest(id: string) {
    const test = await this.testModel.findById(id).exec();
    this.removeTestFiles(test.name);
    return this.testModel.deleteOne({_id: id}).exec();
  }

  removeTestFiles(filename: string) {
    fs.unlinkSync(path.join(resourcesPath, filename + '.input'));
    fs.unlinkSync(path.join(resourcesPath, filename + '.output'));
  }
}
