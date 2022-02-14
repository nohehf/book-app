import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { User, UserService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

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
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    return req.user;
  }

  @Get('user/:id')
  async getUser(@Param('id') id: number) {
    const user: User = await this.userService.getOneById(id);
    if (user) {
      const { password, ...result } = user; //prevents from returning user password
      return result;
    }
    throw new NotFoundException();
  }
}
