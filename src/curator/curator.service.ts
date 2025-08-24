import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import * as schema from '../database/schema';
import { volunteerRequests, type VolunteerRequest } from '../database/schema';

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
} 