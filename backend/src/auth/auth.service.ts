import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface User { id: string; username: string; password: string }

@Injectable()
export class AuthService {
  private users: User[] = [
    { id: '1', username: 'admin', password: 'password' },
  ];

  constructor(private readonly jwt: JwtService) {}

  login(username: string, password: string): string | null {
    const user = this.users.find(
      u => u.username === username && u.password === password,
    );
    if (!user) return null;
    return this.jwt.sign({ sub: user.id });
  }

  verify(token: string): boolean {
    try {
      this.jwt.verify(token);
      return true;
    } catch {
      return false;
    }
  }
}
