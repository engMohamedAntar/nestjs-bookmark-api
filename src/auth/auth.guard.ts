import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    // console.log('req.headers: ', req.headers);
    const token = req.headers.authorization.split(' ')[1];

    //validate that token exist and valid
    if (!token)
      throw new UnauthorizedException('You are not logged in, login first.');

    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      req.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('token not valid or expired');
    }
  }
}
