import { Controller } from '@nestjs/common';
import {Ctx, EventPattern, Payload, RedisContext} from "@nestjs/microservices";

import {AppService} from "./app.service";

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @EventPattern('EVAL_SOLUTION')
  async evalSolution(@Payload() data: {solutionId: string, code: string, tests: string[], language: string}, @Ctx() context: RedisContext) {
    console.log(`Channel: ${context.getChannel()}`, data);

    await this.appService.evalCode(data.solutionId, data.code, data.tests, data.language);
  }
}
