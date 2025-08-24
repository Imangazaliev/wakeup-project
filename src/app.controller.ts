import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Проверка работоспособности API' })
  @ApiResponse({ 
    status: 200, 
    description: 'API работает',
    schema: {
      type: 'string',
      example: 'Hello World!'
    }
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('test')
  @ApiOperation({ summary: 'Тестовый endpoint' })
  @ApiResponse({ 
    status: 200, 
    description: 'Тест успешен',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Test successful' },
        timestamp: { type: 'string', example: '2025-08-24T10:00:00.000Z' }
      }
    }
  })
  testEndpoint(@Body() data: any) {
    return {
      message: 'Test successful',
      timestamp: new Date().toISOString(),
      receivedData: data
    };
  }
}
