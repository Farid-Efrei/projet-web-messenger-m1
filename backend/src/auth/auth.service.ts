import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';

config();

@Injectable()
export class AuthService {
  private readonly token = process.env.API_TOKEN || 'secret';

  validateToken(token: string): boolean {
    return token === this.token;
  }
}
