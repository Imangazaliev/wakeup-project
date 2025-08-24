import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import * as schema from '../database/schema';
import { families, persons, type Family, type Person } from '../database/schema';

@Injectable()
export class FamiliesService {
  constructor(
    @Inject('DATABASE') private readonly db: NodePgDatabase<typeof schema>
  ) {}

  async getAllFamilies(): Promise<Family[]> {
    return await this.db.select().from(families);
  }

  async getFamilyWithMembers(id: number): Promise<{
    family: Family;
    contactPerson: Person;
    members: Person[];
  } | null> {
    // Получаем семью
    const [family] = await this.db
      .select()
      .from(families)
      .where(eq(families.id, id));

    if (!family) {
      return null;
    }

    // Получаем контактное лицо
    const [contactPerson] = await this.db
      .select()
      .from(persons)
      .where(eq(persons.id, family.contactPersonId));

    if (!contactPerson) {
      throw new NotFoundException('Контактное лицо не найдено');
    }

    // Получаем всех членов семьи (в данном случае просто всех персон, 
    // так как у нас нет прямой связи между семьями и персонами)
    // В реальном приложении здесь была бы таблица family_members
    const members = await this.db.select().from(persons);

    return {
      family,
      contactPerson,
      members
    };
  }
} 