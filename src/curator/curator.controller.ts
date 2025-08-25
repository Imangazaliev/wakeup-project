import { Controller, Get, Post, Put, Param, Body, ParseIntPipe, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBody,
  ApiBearerAuth 
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CuratorGuard } from './curator.guard';
import { CuratorService } from './curator.service';
import { 
  VolunteerRequestListItemDto,
  VolunteerRequestDetailDto,
  UpdateRequestStatusDto
} from './dto/volunteer-requests.dto';
import {
  CreateVolunteerDto,
  VolunteerListItemDto,
  VolunteerDetailDto
} from './dto/volunteers.dto';

@ApiTags('curator')
@Controller('curator')
@UseGuards(JwtAuthGuard, CuratorGuard)
@ApiBearerAuth('JWT-auth')
export class CuratorController {
  constructor(private readonly curatorService: CuratorService) {}

  @Get('volunteer-requests')
  @ApiOperation({ summary: 'Получить список заявок волонтеров' })
  @ApiResponse({ 
    status: 200, 
    description: 'Список заявок получен',
    type: [VolunteerRequestListItemDto] 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Доступ запрещен' 
  })
  async getVolunteerRequestsList() {
    return await this.curatorService.getVolunteerRequestsList();
  }

  @Get('volunteer-requests/:id')
  @ApiOperation({ summary: 'Получить детальную информацию о заявке волонтера' })
  @ApiResponse({ 
    status: 200, 
    description: 'Информация о заявке получена',
    type: VolunteerRequestDetailDto 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Заявка не найдена' 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Доступ запрещен' 
  })
  async getVolunteerRequestById(@Param('id', ParseIntPipe) id: number) {
    const request = await this.curatorService.getVolunteerRequestById(id);
    if (!request) {
      throw new NotFoundException('Заявка не найдена');
    }
    return request;
  }

  @Put('volunteer-requests/:id/status')
  @ApiOperation({ summary: 'Изменить статус заявки волонтера' })
  @ApiBody({ type: UpdateRequestStatusDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Статус заявки изменен',
    type: VolunteerRequestDetailDto 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Заявка не найдена' 
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Доступ запрещен' 
  })
  async updateRequestStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateRequestStatusDto,
    @Request() req: any
  ) {
    return await this.curatorService.updateRequestStatus(id, data.status, req.user.userId);
  }

  @Post('create-volunteer')
  @ApiOperation({ summary: 'Создать нового волонтера' })
  @ApiBody({ type: CreateVolunteerDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Волонтер успешно создан' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Пользователь не найден' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Пользователь уже является волонтером' 
  })
  async createVolunteer(
    @Body() data: CreateVolunteerDto,
    @Request() req: any
  ) {
    return await this.curatorService.createVolunteer(data.userId, data.about, req.user.userId);
  }

  @Get('volunteers')
  @ApiOperation({ summary: 'Получить список всех волонтеров' })
  @ApiResponse({ 
    status: 200, 
    description: 'Список волонтеров получен',
    type: [VolunteerListItemDto] 
  })
  async getAllVolunteers() {
    return await this.curatorService.getAllVolunteers();
  }

  @Get('volunteers/:id')
  @ApiOperation({ summary: 'Получить подробную информацию о волонтере' })
  @ApiResponse({ 
    status: 200, 
    description: 'Информация о волонтере получена',
    type: VolunteerDetailDto 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Волонтер не найден' 
  })
  async getVolunteerById(@Param('id', ParseIntPipe) id: number) {
    const volunteer = await this.curatorService.getVolunteerById(id);
    if (!volunteer) {
      throw new NotFoundException('Волонтер не найден');
    }
    return volunteer;
  }
} 