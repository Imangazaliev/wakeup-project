import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { volunteerRequestStatusEnum } from '../../database/schema';

export class VolunteerRequestListItemDto {
  @ApiProperty({
    description: 'ID заявки',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Имя волонтера',
    example: 'Анна Петрова',
  })
  name: string;

  @ApiProperty({
    description: 'Статус заявки',
    example: 'pending',
    enum: volunteerRequestStatusEnum,
  })
  status: typeof volunteerRequestStatusEnum[number];

  @ApiProperty({
    description: 'Дата создания',
    example: '2025-08-24T10:00:00.000Z',
  })
  createdAt: Date;
}

export class VolunteerRequestDetailDto {
  @ApiProperty({
    description: 'ID заявки',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Имя волонтера',
    example: 'Анна Петрова',
  })
  name: string;

  @ApiProperty({
    description: 'Номер телефона',
    example: '+79001234567',
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'Статус заявки',
    example: 'pending',
    enum: volunteerRequestStatusEnum,
  })
  status: typeof volunteerRequestStatusEnum[number];

  @ApiProperty({
    description: 'Информация о себе',
    example: 'Я студентка психологического факультета...',
  })
  aboutSelf: string;

  @ApiProperty({
    description: 'Информация о стажировке',
    example: 'Хочу получить опыт работы с людьми...',
  })
  aboutTraineeship: string;

  @ApiProperty({
    description: 'ID пользователя, обработавшего заявку',
    example: null,
    required: false,
  })
  processedBy: number | null;

  @ApiProperty({
    description: 'Дата создания',
    example: '2025-08-24T10:00:00.000Z',
  })
  createdAt: Date;
}

export class UpdateRequestStatusDto {
  @ApiProperty({
    description: 'Новый статус заявки',
    example: 'approved',
    enum: ['approved', 'rejected'],
  })
  @IsEnum(['approved', 'rejected'])
  status: 'approved' | 'rejected';
} 