import { Test, TestingModule } from '@nestjs/testing';
import {ClientRedis} from "@nestjs/microservices";
import {getModelToken} from "@nestjs/mongoose";

import { ProblemService } from './problem.service';
import {Problem} from "../../schemas/problem.schema";
import {TestService} from "../test/test.service";
import {SolutionService} from "../solution/solution.service";

class TestServiceStub {
}

class SolutionServiceStub {
}

class ClientRedisStub {
}

describe('ProblemService', () => {
  let service: ProblemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProblemService,
        {provide: getModelToken(Problem.name), useValue: {}},
        {provide: 'REDIS_SERVICE', useClass: ClientRedisStub},
        {provide: TestService, useClass: TestServiceStub},
        {provide: SolutionService, useClass: SolutionServiceStub}
      ],
    }).compile();

    service = module.get<ProblemService>(ProblemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
