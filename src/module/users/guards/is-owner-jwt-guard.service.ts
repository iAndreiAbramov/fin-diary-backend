import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class IsOwnerJwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers.authorization;
      const [, token] = authHeader.split(' ');
      const jwtUser = await this.jwtService.verifyAsync(token);
      const params = request?.params;

      return String(jwtUser.id) === String(params.id);

    } catch {
      throw new ForbiddenException();
    }
  }
}
