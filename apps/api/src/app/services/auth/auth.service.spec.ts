import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';
import {UserService} from "../user/user.service";

class UserServiceStub {
}

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, {provide: UserService, useClass: UserServiceStub}],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get a random salt value', () => {
    const salt = service.generateSalt();
    expect(salt.length).toEqual(10);
    const hash = service.passwordHash('changeme', salt);
    expect(hash).toBeTruthy();
    console.log('changeme', salt, hash);
  });
});
