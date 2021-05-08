import { Test, TestingModule } from '@nestjs/testing';

import { ProblemController } from './problem.controller';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ProblemController],
      providers: [],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      const appController = app.get<ProblemController>(ProblemController);
      expect(appController.getData()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
