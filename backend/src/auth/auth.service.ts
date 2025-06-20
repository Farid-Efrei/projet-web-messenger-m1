import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly users: UserService,
  ) {}

  async login(username: string, password: string): Promise<string | null> {
    const user = await this.users.findByUsername(username);
    if (!user || user.password !== password) return null;
    return this.jwt.sign({ sub: user.id });
  }

  verify(token: string): boolean {
    try {
      this.jwt.verify(token);
      return true;
    } catch {
      return false;
    }

import { config } from 'dotenv';

config();

@Injectable()
export class AuthService {
  private readonly token = process.env.API_TOKEN || 'secret';

  validateToken(token: string): boolean {
    return token === this.token;

  }
}
