import { Module } from '@nestjs/common';
import { CuratorController } from './curator.controller';
import { CuratorService } from './curator.service';
import { CuratorGuard } from './curator.guard';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [CuratorController],
  providers: [CuratorService, CuratorGuard],
  exports: [CuratorService],
})
export class CuratorModule {} 