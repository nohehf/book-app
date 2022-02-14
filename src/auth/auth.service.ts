import { Injectable } from '@nestjs/common';
import { User, UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getOne(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null; // user is not valid
  }

  async createUser(email: string, password: string): Promise<any> {
    const existing_user = await this.userService.getOne(email);
    if (!existing_user) {
      const new_user = await this.userService.createOne(email, password);
      return new_user;
    }
    return null; // user already exists
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
