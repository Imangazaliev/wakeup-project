import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../database/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('DATABASE') private readonly db: NodePgDatabase<typeof schema>
  ) {}

  async generateToken(userId: number): Promise<string> {
    const payload = { 
      sub: userId, 
      token: this.generateTokenId() 
    };
    
    const token = this.jwtService.sign(payload);
    
    // Сохраняем токен в базу данных
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 дней
    
    await this.db.insert(schema.jwtTokens).values({
      userId,
      token: payload.token,
      expiresAt,
    });
    
    return token;
  }

  async invalidateToken(token: string): Promise<void> {
    await this.db
      .update(schema.jwtTokens)
      .set({ isValid: false })
      .where(eq(schema.jwtTokens.token, token));
  }

  private generateTokenId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
} 