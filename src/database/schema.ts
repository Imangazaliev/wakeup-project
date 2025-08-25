import { pgTable, serial, varchar, timestamp, text, integer, boolean, date } from 'drizzle-orm/pg-core';

// Enum для типов пользователей
export const userTypeEnum = ['curator', 'ward', 'volunteer'] as const;

// Enum для статусов заявок волонтеров
export const volunteerRequestStatusEnum = ['pending', 'approved', 'rejected'] as const;

// Enum для пола
export const sexEnum = ['male', 'female'] as const;

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

// Таблица запросов волонтеров
export const volunteerRequests = pgTable('volunteer_requests', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  phoneNumber: varchar('phone_number', { length: 20 }).notNull(),
  status: text('status').notNull().default('pending').$type<typeof volunteerRequestStatusEnum[number]>(),
  aboutSelf: text('about_self').notNull(),
  aboutTraineeship: text('about_traineeship').notNull(),
  processedBy: integer('processed_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Таблица персон (членов семьи)
export const persons = pgTable('persons', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  sex: text('sex').notNull().$type<typeof sexEnum[number]>(),
  phoneNumber: varchar('phone_number', { length: 20 }),
  birthDate: date('birth_date'),
});

// Таблица семей
export const families = pgTable('families', {
  id: serial('id').primaryKey(),
  city: text('city').notNull(),
  address: text('address').notNull(),
  contactPersonId: integer('contact_person_id').notNull().references(() => persons.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Таблица волонтеров
export const volunteers = pgTable('volunteers', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  about: text('about').notNull(),
  createdBy: integer('created_by').notNull().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Типы для TypeScript
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type VerificationCode = typeof verificationCodes.$inferSelect;
export type NewVerificationCode = typeof verificationCodes.$inferInsert;
export type JwtToken = typeof jwtTokens.$inferSelect;
export type NewJwtToken = typeof jwtTokens.$inferInsert;
export type VolunteerRequest = typeof volunteerRequests.$inferSelect;
export type NewVolunteerRequest = typeof volunteerRequests.$inferInsert;
export type Person = typeof persons.$inferSelect;
export type NewPerson = typeof persons.$inferInsert;
export type Family = typeof families.$inferSelect;
export type NewFamily = typeof families.$inferInsert;
export type Volunteer = typeof volunteers.$inferSelect;
export type NewVolunteer = typeof volunteers.$inferInsert; 