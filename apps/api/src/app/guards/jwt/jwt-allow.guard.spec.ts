import {JwtAllowGuard} from "./jwt-allow.guard";

describe('JwtGuard', () => {
  it('should be defined', () => {
    expect(new JwtAllowGuard()).toBeDefined();
  });
});
