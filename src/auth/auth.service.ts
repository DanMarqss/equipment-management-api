import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService 
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    console.log(`[AuthService] Validating user: ${username}`);
    const user = await this.usersService.findOneByUsername(username);
    
    if (!user) {
      console.log(`[AuthService] User not found: ${username}`);
      return null;
    }

    console.log(`[AuthService] User found: ${JSON.stringify(user)}`);
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(`[AuthService] Password valid: ${isPasswordValid}`);
    
    if (!isPasswordValid) {
      console.log(`[AuthService] Invalid password for user: ${username}`);
      return null;
    }

    console.log(`[AuthService] User validated successfully: ${username}`);
    return user;
  }

  async login(user: User) {
    console.log(`[AuthService] Generating JWT for user: ${user.username}`);
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);
    console.log(`[AuthService] JWT generated: ${token}`);

    return {
      access_token: token,
    };
  }
}
