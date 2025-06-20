import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  async create(username: string, password: string): Promise<UserEntity> {
    const user = this.repo.create({ username, password, blocked: [] });
    return this.repo.save(user);
  }

  findByUsername(username: string) {
    return this.repo.findOne({ where: { username } });
  }

  async blockUser(userId: string, targetId: string) {
    const user = await this.repo.findOne({ where: { id: userId } });
    if (!user) return;
    user.blocked = Array.from(new Set([...(user.blocked || []), targetId]));
    await this.repo.save(user);
  }

  async isBlocked(userId: string, senderId: string) {
    const user = await this.repo.findOne({ where: { id: userId } });
    return user?.blocked.includes(senderId);
  }
}
