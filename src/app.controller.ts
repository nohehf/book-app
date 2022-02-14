import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { User } from './users/users.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    const createdUser: User = await this.authService.createUser(
      body.email,
      body.password,
    );
    return createdUser;
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}
