import { Injectable, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import * as schema from '../database/schema';
import { volunteerRequests, type VolunteerRequest, type NewVolunteerRequest, volunteerRequestStatusEnum } from '../database/schema';

@Injectable()
export class VolunteersService {
  constructor(
    @Inject('DATABASE') private readonly db: NodePgDatabase<typeof schema>
  ) {}

  async createVolunteerRequest(requestData: Omit<NewVolunteerRequest, 'id' | 'status' | 'processedBy' | 'createdAt'>): Promise<{ id: number }> {
    const [request] = await this.db.insert(volunteerRequests).values({
      ...requestData,
      status: 'pending',
      processedBy: null,
    }).returning();
    return { id: request.id };
  }

  async getRequestStatus(id: number): Promise<{ status: typeof volunteerRequestStatusEnum[number] } | null> {
    const [request] = await this.db
      .select({ status: volunteerRequests.status })
      .from(volunteerRequests)
      .where(eq(volunteerRequests.id, id));
    
    return request ? { status: request.status } : null;
  }
} 