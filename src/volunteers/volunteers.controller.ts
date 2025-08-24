import { Controller, Post, Body, Get, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBody 
} from '@nestjs/swagger';
import { VolunteersService } from './volunteers.service';
import { 
  CreateVolunteerRequestDto,
  CreateVolunteerRequestResponseDto,
  RequestStatusResponseDto
} from './dto';

@ApiTags('volunteers')
@Controller('volunteers')
export class VolunteersController {
  constructor(private readonly volunteersService: VolunteersService) {}

  @Post('create-request')
  @ApiOperation({ summary: 'Создать запрос волонтера' })
  @ApiBody({ type: CreateVolunteerRequestDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Запрос волонтера успешно создан',
    type: CreateVolunteerRequestResponseDto 
  })
  async createVolunteerRequest(@Body() requestData: CreateVolunteerRequestDto) {
    return await this.volunteersService.createVolunteerRequest(requestData);
  }

  @Get('request-status/:id')
  @ApiOperation({ summary: 'Получить статус заявки волонтера по ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Статус заявки получен',
    type: RequestStatusResponseDto 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Заявка не найдена' 
  })
  async getRequestStatus(@Param('id', ParseIntPipe) id: number) {
    const result = await this.volunteersService.getRequestStatus(id);
    if (!result) {
      throw new NotFoundException('Заявка не найдена');
    }
    return result;
  }
} 