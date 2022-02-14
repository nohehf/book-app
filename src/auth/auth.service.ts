import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

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
}
