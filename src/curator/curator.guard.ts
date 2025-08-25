import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/database/schema';

@Injectable()
export class CuratorGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request & { user: User }>();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Пользователь не авторизован');
    }

    if (user.type !== 'curator') {
      throw new ForbiddenException('Доступ только для кураторов');
    }

    return true;
  }
} 