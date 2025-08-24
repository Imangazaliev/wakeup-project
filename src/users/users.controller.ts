import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { User, NewUser } from '../database/schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() userData: Omit<NewUser, 'id' | 'createdAt'>): Promise<User> {
    return await this.usersService.createUser(userData);
  }



  // Endpoints для работы с кодами верификации
  @Post('send-verification-code')
  async sendVerificationCode(@Body() data: { phoneNumber: string }) {
    const code = await this.usersService.generateAndSaveVerificationCode(data.phoneNumber);
    return { code };
  }

  @Post('check-code')
  async checkCode(@Body() data: { phoneNumber: string; code: string }) {
    const result = await this.usersService.checkVerificationCode(data.phoneNumber, data.code);
    return result;
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Request() req) {
    return req.user;
  }
} 