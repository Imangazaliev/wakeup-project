import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class CuratorGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const user = (request as any).user;

    if (!user) {
      throw new ForbiddenException('Пользователь не авторизован');
    }

    if (user.type !== 'curator') {
      throw new ForbiddenException('Доступ только для кураторов');
    }

    return true;
  }
} 