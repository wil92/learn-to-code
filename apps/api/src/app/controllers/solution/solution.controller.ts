import {Controller, Get, Param} from '@nestjs/common';
import {SolutionService} from "../../services/solution/solution.service";

@Controller('solutions')
export class SolutionController {
  constructor(private readonly solutionService: SolutionService) {}

  @Get(':id')
  getSolutionById(@Param() {id}) {
    return this.solutionService.getSolutionById(id);
  }
}
