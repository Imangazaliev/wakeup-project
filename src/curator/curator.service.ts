import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import * as schema from '../database/schema';
import { volunteerRequests, volunteers, users, type VolunteerRequest, type Volunteer } from '../database/schema';

@Injectable()
export class CuratorService {
  constructor(
    @Inject('DATABASE') private readonly db: NodePgDatabase<typeof schema>
  ) {}

  async getVolunteerRequestsList(): Promise<Array<{
    id: number;
    name: string;
    status: string;
    createdAt: Date;
  }>> {
    return await this.db
      .select({
        id: volunteerRequests.id,
        name: volunteerRequests.name,
        status: volunteerRequests.status,
        createdAt: volunteerRequests.createdAt,
      })
      .from(volunteerRequests)
      .orderBy(volunteerRequests.createdAt);
  }

  async getVolunteerRequestById(id: number): Promise<VolunteerRequest | null> {
    const [request] = await this.db
      .select()
      .from(volunteerRequests)
      .where(eq(volunteerRequests.id, id));
    
    return request || null;
  }

  async updateRequestStatus(id: number, status: 'approved' | 'rejected', curatorId: number): Promise<VolunteerRequest> {
    const [request] = await this.db
      .update(volunteerRequests)
      .set({
        status,
        processedBy: curatorId,
      })
      .where(eq(volunteerRequests.id, id))
      .returning();

    if (!request) {
      throw new NotFoundException('Заявка не найдена');
    }

    return request;
  }

  async createVolunteer(userId: number, about: string, curatorId: number): Promise<Volunteer> {
    // Проверяем, что пользователь существует
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, userId));

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    // Проверяем, что пользователь еще не является волонтером
    const [existingVolunteer] = await this.db
      .select()
      .from(volunteers)
      .where(eq(volunteers.userId, userId));

    if (existingVolunteer) {
      throw new NotFoundException('Пользователь уже является волонтером');
    }

    // Создаем запись волонтера
    const [volunteer] = await this.db
      .insert(volunteers)
      .values({
        userId,
        about,
        createdBy: curatorId,
      })
      .returning();

    return volunteer;
  }

  async getAllVolunteers(): Promise<Array<{
    id: number;
    name: string;
  }>> {
    return await this.db
      .select({
        id: users.id,
        name: users.name,
      })
      .from(volunteers)
      .innerJoin(users, eq(volunteers.userId, users.id))
      .orderBy(users.name);
  }

  async getVolunteerById(id: number): Promise<{
    id: number;
    name: string;
    phoneNumber: string;
    about: string;
    createdAt: Date;
  } | null> {
    const [volunteer] = await this.db
      .select({
        id: users.id,
        name: users.name,
        phoneNumber: users.phoneNumber,
        about: volunteers.about,
        createdAt: volunteers.createdAt,
      })
      .from(volunteers)
      .innerJoin(users, eq(volunteers.userId, users.id))
      .where(eq(users.id, id));

    return volunteer || null;
  }
} 