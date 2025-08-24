import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class SendVerificationCodeDto {
  @ApiProperty({
    description: 'Номер телефона для отправки кода верификации',
    example: '+79001234567',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
}

export class CheckCodeDto {
  @ApiProperty({
    description: 'Номер телефона',
    example: '+79001234567',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    description: 'Код верификации (6 цифр)',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  code: string;
} 