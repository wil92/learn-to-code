import {ExecutionContext, Injectable} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";

@Injectable()
export class JwtAllowGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    super.canActivate(context);
    return true;
  }

  handleRequest(err, user, info) {
    return user;
  }
}
