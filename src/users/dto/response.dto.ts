import { ApiProperty } from '@nestjs/swagger';

export class SendVerificationCodeResponseDto {
  @ApiProperty({
    description: 'Сгенерированный код верификации',
    example: '123456',
  })
  code: string;
}

export class CheckCodeResponseDto {
  @ApiProperty({
    description: 'Успешность проверки кода',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'JWT токен (только при успешной проверке)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    required: false,
  })
  token?: string;
}

export class UserResponseDto {
  @ApiProperty({
    description: 'ID пользователя',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'Номер телефона',
    example: '+79001234567',
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иван Иванов',
  })
  name: string;

  @ApiProperty({
    description: 'Тип пользователя',
    example: 'ward',
  })
  type: string;
} 