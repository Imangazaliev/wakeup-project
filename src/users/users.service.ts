import { Injectable, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, and } from 'drizzle-orm';
import * as schema from '../database/schema';
import { users, verificationCodes, type User, type NewUser, type NewVerificationCode } from '../database/schema';

@Injectable()
export class UsersService {
  constructor(
    @Inject('DATABASE') private readonly db: NodePgDatabase<typeof schema>
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

  async checkVerificationCode(phoneNumber: string, code: string): Promise<boolean> {
    const [verificationCode] = await this.db
      .select()
      .from(verificationCodes)
      .where(and(eq(verificationCodes.phoneNumber, phoneNumber), eq(verificationCodes.code, code)));
    
    if (verificationCode && verificationCode.id) {
      // Удаляем использованный код
      await this.db.delete(verificationCodes).where(eq(verificationCodes.id, verificationCode.id));
      return true;
    }
    
    return false;
  }
} 