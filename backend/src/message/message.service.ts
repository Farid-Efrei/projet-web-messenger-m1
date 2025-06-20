import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from './message.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class MessageService implements OnModuleInit {
  private channel: amqp.Channel | undefined;
  constructor(
    @InjectRepository(MessageEntity)
    private readonly repo: Repository<MessageEntity>,
    private readonly users: UserService,
  ) {}

  async onModuleInit() {
    try {
      const conn = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
      this.channel = await conn.createChannel();
      await this.channel.assertQueue('messages');
      await this.channel.assertQueue('notifications');
    } catch {}
  }

  async create(content: string, recipientId: string, senderId: string, roomId: string) {
    if (await this.users.isBlocked(recipientId, senderId)) return null;
    const message = await this.repo.save({ content, recipientId, senderId, roomId });
    if (this.channel) {
      this.channel.sendToQueue('messages', Buffer.from(content));
      this.channel.sendToQueue(
        `notifications.${recipientId}`,
        Buffer.from('new message'),
      );
    }
    return message;
  }

  async findAll(roomId?: string) {
    if (roomId) {
      return this.repo.find({ where: { roomId } });
    }
    return this.repo.find();
  }
}
