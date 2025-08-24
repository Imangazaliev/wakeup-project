import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../database/schema';
import { eq, and, gt } from 'drizzle-orm';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    @Inject('DATABASE') private readonly db: NodePgDatabase<typeof schema>
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.substring(7);

    try {
      const payload = this.jwtService.verify(token);
      
      // Проверяем, что токен существует в базе данных и не истек
      const [dbToken] = await this.db
        .select()
        .from(schema.jwtTokens)
        .where(
          and(
            eq(schema.jwtTokens.token, payload.token),
            eq(schema.jwtTokens.isValid, true),
            gt(schema.jwtTokens.expiresAt, new Date())
          )
        );

      if (!dbToken) {
        throw new UnauthorizedException('Invalid token');
      }

      // Получаем пользователя
      const [user] = await this.db
        .select()
        .from(schema.users)
        .where(eq(schema.users.id, payload.sub));

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Добавляем пользователя в request
      (req as any).user = {
        userId: user.id,
        phoneNumber: user.phoneNumber,
        name: user.name,
        type: user.type,
        token: payload.token
      };

      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
} 