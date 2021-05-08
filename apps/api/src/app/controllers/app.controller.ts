import { Controller, Get } from '@nestjs/common';

import {ProblemService} from "../services/problem/problem.service";

@Controller('problems')
export class AppController {
  constructor(private readonly problemService: ProblemService) {}

  @Get()
  getData() {
    return this.problemService.findAll();
  }
}
