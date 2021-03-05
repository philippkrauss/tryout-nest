import {Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const role = request.headers.role;
    if (!roles.includes(role)) {
      throw new HttpException('oh oh...', HttpStatus.BAD_REQUEST)
    }
    return true
  }
}
