import { Test, TestingModule } from '@nestjs/testing';

import { ProblemController } from './problem.controller';
import {ProblemService} from "../../services/problem/problem.service";

class ProblemServiceStub {
}

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ProblemController],
      providers: [{provide: ProblemService, useClass: ProblemServiceStub}],
    }).compile();
  });

  it('should create', () => {
    expect(app).toBeTruthy();
  });
});
