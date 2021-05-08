import {Controller} from '@nestjs/common';
import {Ctx, MessagePattern, Payload, RedisContext, Transport} from "@nestjs/microservices";

import {AppService} from "./app.service";

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern('EVAL_SOLUTION', Transport.REDIS)
  async evalSolution(@Payload() data: {solutionId: string, code: string, tests: string[], language: string}, @Ctx() context: RedisContext) {
    console.log(`Channel: ${context.getChannel()}`, data);

    return await this.appService.evalCode(data.solutionId, data.code, data.tests, data.language);
  }
}
