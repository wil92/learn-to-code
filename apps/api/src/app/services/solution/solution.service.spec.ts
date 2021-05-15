import { Test, TestingModule } from '@nestjs/testing';
import {getModelToken} from "@nestjs/mongoose";

import { SolutionService } from './solution.service';
import {Solution} from "../../schemas/solution.schema";

describe('SolutionService', () => {
  let service: SolutionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolutionService, {provide: getModelToken(Solution.name), useValue: {}}],
    }).compile();

    service = module.get<SolutionService>(SolutionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
