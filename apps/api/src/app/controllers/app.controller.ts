import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';

import {ProblemService} from "../services/problem/problem.service";
import {ProblemDto} from "../dtos/problem.dto";

@Controller('problems')
export class AppController {
  constructor(private readonly problemService: ProblemService) {}

  @Get()
  getData() {
    return this.problemService.findAll();
  }

  @Get(':id')
  getProblemById(@Param() {id}) {
    return this.problemService.findOneById(id);
  }

  @Post()
  createProblem(@Body() problem: ProblemDto) {
    console.log('create', problem)
    return this.problemService.create(problem)
  }

  @Delete(':id')
  deleteProblem(@Param() {id}) {
    return this.problemService.delete(id);
  }

  @Patch(':id')
  editProblem(@Param() {id}, @Body() problem: ProblemDto) {
    return this.problemService.update(id, problem);
  }
}
