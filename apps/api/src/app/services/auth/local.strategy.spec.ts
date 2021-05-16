import { Test, TestingModule } from '@nestjs/testing';

import {LocalStrategy} from "./local.strategy";
import {AuthService} from "./auth.service";

class AuthServiceStub {
}

describe('LocalStrategy', () => {
  let service: LocalStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalStrategy, {provide: AuthService, useClass: AuthServiceStub}],
    }).compile();

    service = module.get<LocalStrategy>(LocalStrategy);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
