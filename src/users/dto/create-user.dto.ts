import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsNotEmpty } from 'class-validator';

export enum UserType {
  CURATOR = 'curator',
  WARD = 'ward',
  VOLUNTEER = 'volunteer',
}

export class CreateUserDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иван Иванов',
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
    description: 'Тип пользователя',
    enum: UserType,
    example: UserType.WARD,
  })
  @IsEnum(UserType)
  type: UserType;
} 