import { pgTable, serial, varchar, timestamp, text, integer, boolean } from 'drizzle-orm/pg-core';

// Enum для типов пользователей
export const userTypeEnum = ['curator', 'ward', 'volunteer'] as const;

// Таблица пользователей
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  phoneNumber: varchar('phone_number', { length: 20 }).notNull().unique(),
  type: text('type').notNull().$type<typeof userTypeEnum[number]>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Таблица кодов верификации
export const verificationCodes = pgTable('verification_codes', {
  id: serial('id').primaryKey(),
  phoneNumber: varchar('phone_number', { length: 20 }).notNull(),
  code: varchar('code', { length: 6 }).notNull(),
  sentAt: timestamp('sent_at').defaultNow().notNull(),
});

// Таблица JWT токенов
export const jwtTokens = pgTable('jwt_tokens', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  token: text('token').notNull(),
  isValid: boolean('is_valid').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  expiresAt: timestamp('expires_at').notNull(),
});

// Типы для TypeScript
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type VerificationCode = typeof verificationCodes.$inferSelect;
export type NewVerificationCode = typeof verificationCodes.$inferInsert;
export type JwtToken = typeof jwtTokens.$inferSelect;
export type NewJwtToken = typeof jwtTokens.$inferInsert; 