import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    return {
      status: 'ok',
      message: 'Агрегатор домашней еды — Backend работает',
      timestamp: new Date().toISOString(),
      version: '0.1.0',
    };
  }
}
