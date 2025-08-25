import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateVolunteerDto {
  @ApiProperty({
    description: 'ID пользователя, который становится волонтером',
    example: 1,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: 'Информация о волонтере',
    example: 'Опыт работы с детьми, образование психолога, желание помогать людям...',
  })
  @IsString()
  @IsNotEmpty()
  about: string;
}

export class VolunteerListItemDto {
  @ApiProperty({
    description: 'ID пользователя',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иван Петров',
  })
  name: string;
}

export class VolunteerDetailDto {
  @ApiProperty({
    description: 'ID пользователя',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иван Петров',
  })
  name: string;

  @ApiProperty({
    description: 'Номер телефона',
    example: '+79001234567',
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'Информация о волонтере',
    example: 'Опыт работы с детьми, образование психолога...',
  })
  about: string;

  @ApiProperty({
    description: 'Дата создания записи волонтера',
    example: '2025-08-24T10:00:00.000Z',
  })
  createdAt: Date;
} 