import { Controller, Get, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FamiliesService } from './families.service';
import { Family, Person } from '../database/schema';

@ApiTags('families')
@Controller('families')
export class FamiliesController {
  constructor(private readonly familiesService: FamiliesService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все семьи' })
  @ApiResponse({ status: 200, description: 'Список семей получен' })
  async getAllFamilies(): Promise<Family[]> {
    return await this.familiesService.getAllFamilies();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить подробную информацию о семье с членами' })
  @ApiResponse({ status: 200, description: 'Информация о семье получена' })
  @ApiResponse({ status: 404, description: 'Семья не найдена' })
  async getFamilyWithMembers(@Param('id', ParseIntPipe) id: number) {
    const result = await this.familiesService.getFamilyWithMembers(id);
    if (!result) {
      throw new NotFoundException('Семья не найдена');
    }
    return result;
  }
} 