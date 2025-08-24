import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../database/schema';
import { eq, and, gt } from 'drizzle-orm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @Inject('DATABASE') private readonly db: NodePgDatabase<typeof schema>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET', 'your-secret-key'),
    });
  }

  async validate(payload: any) {
    // Проверяем, что токен существует в базе данных и не истек
    const [token] = await this.db
      .select()
      .from(schema.jwtTokens)
      .where(
        and(
          eq(schema.jwtTokens.token, payload.token),
          eq(schema.jwtTokens.isValid, true),
          gt(schema.jwtTokens.expiresAt, new Date())
        )
      );

    if (!token) {
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

    return { 
      userId: user.id, 
      phoneNumber: user.phoneNumber,
      name: user.name,
      type: user.type,
      token: payload.token 
    };
  }
} 