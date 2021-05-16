import {ExecutionContext, Injectable} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";

@Injectable()
export class JwtAllowGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    return user;
  }
}
