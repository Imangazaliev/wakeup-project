import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'DATABASE',
      useFactory: async (configService: ConfigService) => {
        const pool = new Pool({
          host: configService.get('DB_HOST', 'localhost'),
          port: configService.get('DB_PORT', 5432),
          user: configService.get('DB_USER', 'postgres'),
          password: configService.get('DB_PASSWORD', 'password'),
          database: configService.get('DB_NAME', 'pora_vstavat'),
          ssl: configService.get('DB_SSL', 'false') === 'true' ? { rejectUnauthorized: false } : false,
        });

        return drizzle(pool, { schema });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['DATABASE'],
})
export class DatabaseModule {} 