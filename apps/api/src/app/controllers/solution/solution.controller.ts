import {Controller, Get, Param} from '@nestjs/common';
import {SolutionService} from "../../services/solution/solution.service";
import {Ctx, EventPattern, Payload, RedisContext} from "@nestjs/microservices";

@Controller('solutions')
export class SolutionController {
  constructor(private readonly solutionService: SolutionService) {}

  @Get(':id')
  getSolutionById(@Param() {id}) {
    return this.solutionService.getSolutionById(id);
  }

  @EventPattern('EVAL_RESULT')
  async evalSolution(@Payload() data: {solutionId: string, result: boolean}, @Ctx() context: RedisContext) {
    console.log(`Channel: ${context.getChannel()}`, data);

    const status = data.result ? 'ACCEPT' : 'WRONG_ANSWER';
    await this.solutionService.updateSolutionStatus(data.solutionId, status);
  }
}
