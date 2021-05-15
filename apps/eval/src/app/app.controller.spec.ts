import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import {AppService} from "./app.service";

class AppServiceStub {
}

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{provide: AppService, useClass: AppServiceStub}]
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
