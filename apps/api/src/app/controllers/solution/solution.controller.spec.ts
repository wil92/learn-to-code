import { Test, TestingModule } from '@nestjs/testing';
import { SolutionController } from './solution.controller';
import {SolutionService} from "../../services/solution/solution.service";

class SolutionServiceStub {
}

describe('SolutionController', () => {
  let controller: SolutionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolutionController],
      providers: [{provide: SolutionService, useClass: SolutionServiceStub}]
    }).compile();

    controller = module.get<SolutionController>(SolutionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
