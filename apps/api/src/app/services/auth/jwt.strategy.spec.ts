import { Test, TestingModule } from '@nestjs/testing';

import {JwtStrategy} from "./jwt.strategy";
import {Environment} from "../../app.module";

describe('JwtService', () => {
  let service: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtStrategy, {provide: 'ENVIRONMENT', useValue: {jwtSecret: 'rmpsecret'}}],
    }).compile();

    service = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
