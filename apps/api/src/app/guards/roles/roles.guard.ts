import {Observable} from 'rxjs';
import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  roles: string[] = [];

  constructor(...roles: string[]) {
    this.roles = roles;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (!this.roles || this.roles.length === 0) {
      return true;
    }
    return false;
  }
}
