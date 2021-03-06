import {Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards} from '@nestjs/common';

import {ProblemService} from "../../services/problem/problem.service";
import {ProblemDto} from "../../dtos/problem.dto";
import {SolveDto} from "../../dtos/solve.dto";
import {JwtGuard} from "../../guards/jwt/jwt.guard";
import {RolesGuard} from "../../guards/roles/roles.guard";
import {JwtAllowGuard} from "../../guards/jwt/jwt-allow.guard";

@Controller('problems')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @UseGuards(JwtAllowGuard)
  @Get()
  getData(@Request() req) {
    return this.problemService.findAll(req.user);
  }

  @Get(':id')
  getProblemById(@Param() {id}) {
    return this.problemService.findOneById(id);
  }

  @UseGuards(JwtGuard, new RolesGuard('admin'))
  @Post()
  createProblem(@Body() problem: ProblemDto) {
    console.log('create', problem)
    return this.problemService.create(problem)
  }

  @UseGuards(JwtGuard, new RolesGuard('admin'))
  @Delete(':id')
  deleteProblem(@Param() {id}) {
    return this.problemService.delete(id);
  }

  @UseGuards(JwtGuard, new RolesGuard('admin'))
  @Put(':id')
  editProblem(@Param() {id}, @Body() problem: ProblemDto) {
    return this.problemService.update(id, problem);
  }

  @UseGuards(JwtGuard)
  @Post('solve/:id')
  solve(@Param() {id}, @Body() {code, language}: SolveDto, @Request() req) {
    return this.problemService.solveProblem(id, code, language, req.user.username);
  }
}
