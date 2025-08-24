import { Injectable, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, and } from 'drizzle-orm';
import * as schema from '../database/schema';
import { users, verificationCodes, type User, type NewUser, type NewVerificationCode } from '../database/schema';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject('DATABASE') private readonly db: NodePgDatabase<typeof schema>,
    private readonly authService: AuthService
  ) {}

  async createUser(userData: Omit<NewUser, 'id' | 'createdAt'>): Promise<User> {
    const [user] = await this.db.insert(users).values(userData).returning();
    return user;
  }



  // Методы для работы с кодами верификации
  async generateAndSaveVerificationCode(phoneNumber: string): Promise<string> {
    // Генерируем случайный 6-значный код
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Сохраняем код в базу данных
    await this.db.insert(verificationCodes).values({
      phoneNumber,
      code,
    });
    
    return code;
  }

  async checkVerificationCode(phoneNumber: string, code: string): Promise<{ success: boolean; token?: string }> {
    const [verificationCode] = await this.db
      .select()
      .from(verificationCodes)
      .where(and(eq(verificationCodes.phoneNumber, phoneNumber), eq(verificationCodes.code, code)));
    
    if (verificationCode && verificationCode.id) {
      // Удаляем использованный код
      await this.db.delete(verificationCodes).where(eq(verificationCodes.id, verificationCode.id));
      
      // Находим или создаем пользователя
      let [user] = await this.db.select().from(users).where(eq(users.phoneNumber, phoneNumber));
      
      if (!user) {
        // Создаем нового пользователя
        [user] = await this.db.insert(users).values({
          name: `User ${phoneNumber}`,
          phoneNumber,
          type: 'ward', // По умолчанию
        }).returning();
      }
      
      // Генерируем JWT токен
      const token = await this.authService.generateToken(user.id);
      
      return { success: true, token };
    }
    
    return { success: false };
  }
} 