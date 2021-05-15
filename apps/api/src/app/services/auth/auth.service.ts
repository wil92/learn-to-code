import * as crypto from 'crypto';
import {Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";

import {UserService} from "../user/user.service";

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService) {
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    const passwordHash = this.passwordHash(password, user.salt);
    if (user && user.password === passwordHash) {
      const { password, salt, ...result } = user;
      return result;
    }
    return null;
  }

  async registerLocal(username: string, password: string, email: string) {
    const salt = this.generateSalt();
    const passwordHash = this.passwordHash(password, salt);
    await this.userService.registerUser({username, email, salt, passwordHash})
  }

  passwordHash(password: string, salt: string): string {
    const alg = crypto.createHmac('sha256', salt);
    alg.update(password);
    return alg.digest('hex');
  }

  generateSalt(length: number = 10) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
  }

  generateJwt(user): string {
    return this.jwtService.sign(user);
  }
}
