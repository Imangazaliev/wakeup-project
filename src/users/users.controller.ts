import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBearerAuth,
  ApiBody 
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { User, NewUser } from '../database/schema';
import { 
  CreateUserDto, 
  SendVerificationCodeDto, 
  CheckCodeDto,
  SendVerificationCodeResponseDto, 
  CheckCodeResponseDto, 
  UserResponseDto 
} from './dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Создать нового пользователя' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Пользователь успешно создан',
    type: UserResponseDto 
  })
  async createUser(@Body() userData: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(userData);
  }



  // Endpoints для работы с кодами верификации
  @Post('send-verification-code')
  @ApiOperation({ summary: 'Отправить код верификации' })
  @ApiBody({ type: SendVerificationCodeDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Код верификации отправлен',
    type: SendVerificationCodeResponseDto 
  })
  async sendVerificationCode(@Body() data: SendVerificationCodeDto) {
    const code = await this.usersService.generateAndSaveVerificationCode(data.phoneNumber);
    return { code };
  }

  @Post('check-code')
  @ApiOperation({ summary: 'Проверить код верификации' })
  @ApiBody({ type: CheckCodeDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Код проверен',
    type: CheckCodeResponseDto 
  })
  async checkCode(@Body() data: CheckCodeDto) {
    const result = await this.usersService.checkVerificationCode(data.phoneNumber, data.code);
    return result;
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Получить информацию о текущем пользователе' })
  @ApiResponse({ 
    status: 200, 
    description: 'Информация о пользователе',
    type: UserResponseDto 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Не авторизован' 
  })
  async getCurrentUser(@Request() req) {
    return req.user;
  }
} 