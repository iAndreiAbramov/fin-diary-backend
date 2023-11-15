import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from '@src/types/jwt-payload.interface';

@Injectable()
export class ParseUserIdMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {
  }

  async use(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next();
    }

    const [type, token] = authorizationHeader.split(' ');
    if (!type || type !== 'Bearer' || !token) {
      return next();
    }

    let jwtUser: IJwtPayload;

    try {
      jwtUser = await this.jwtService.verifyAsync(token);
    } catch {
      throw new ForbiddenException();
    }

    req.query.userId = String(jwtUser?.id);
    return next();
  }
}
