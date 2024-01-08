import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private jwt : JwtService
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request : Request = context.switchToHttp().getRequest();
    
    if(!request.headers.authorization)
      return false;
    try {
      let val = this.jwt.verify(request.headers.authorization)
      if(val)
        return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
