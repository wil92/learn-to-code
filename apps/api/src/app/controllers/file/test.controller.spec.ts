import { Test, TestingModule } from '@nestjs/testing';

import { TestController } from './test.controller';
import {TestService} from "../../services/test/test.service";

class TestServiceStub {
}

describe('FileController', () => {
  let controller: TestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestController],
      providers: [{provide: TestService, useClass: TestServiceStub}]
    }).compile();

    controller = module.get<TestController>(TestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
