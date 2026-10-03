import { Controller, Post, Get, Body, Patch, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: { phone: string; name: string; role?: string }) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: { phone: string }) {
    return this.authService.login(body.phone);
  }

  @Get('users')
  findAll() {
    return this.authService.findAll();
  }

  @Patch('profile/:id')
  updateProfile(@Param('id') id: string, @Body() body: any) {
    return this.authService.updateProfile(id, body);
  }
}
