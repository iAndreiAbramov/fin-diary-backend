import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class IsOwnerJwtGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const passedId = parseInt(request.params?.id) || request.body?.id;
    const userId = parseInt(request.query?.userId);

    return passedId && userId && passedId === userId;
  }
}
