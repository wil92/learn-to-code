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
    const {role} = context.switchToHttp().getRequest().user;
    return this.hasRole(role, this.roles);
  }

  hasRole(role, roles: string[]): boolean {
    return roles.findIndex(r => r === role) !== -1;
  }
}
