import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateVolunteerRequestDto {
  @ApiProperty({
    description: 'Имя волонтера',
    example: 'Анна Петрова',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Номер телефона',
    example: '+79001234567',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    description: 'Информация о себе',
    example: 'Я студентка психологического факультета, хочу помогать людям...',
  })
  @IsString()
  @IsNotEmpty()
  aboutSelf: string;

  @ApiProperty({
    description: 'Информация о стажировке',
    example: 'Хочу получить опыт работы с людьми, научиться консультированию...',
  })
  @IsString()
  @IsNotEmpty()
  aboutTraineeship: string;
} 