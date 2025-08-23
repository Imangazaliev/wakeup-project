import { pgTable, serial, varchar, timestamp, text } from 'drizzle-orm/pg-core';

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

// Типы для TypeScript
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type VerificationCode = typeof verificationCodes.$inferSelect;
export type NewVerificationCode = typeof verificationCodes.$inferInsert; 