import {ExtractJwt, Strategy} from "passport-jwt";
import {Inject, Injectable} from '@nestjs/common';
import {PassportStrategy} from "@nestjs/passport";

import {Environment} from "../../app.module";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(@Inject('ENVIRONMENT') private readonly env: Environment) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.jwtSecret
    });
  }

  async validate(payload: any) {
    return { ...payload };
  }
}
