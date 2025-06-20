import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';
import { MessageRepository } from './message.repository';

@Injectable()
export class MessageService implements OnModuleInit {
  private channel: amqp.Channel | undefined;
  constructor(private readonly repo: MessageRepository) {}

  async onModuleInit() {
    await this.repo.load();
    try {
      const conn = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
      this.channel = await conn.createChannel();
      await this.channel.assertQueue('messages');
      await this.channel.assertQueue('notifications');
    } catch {}
  }

  async create(content: string) {
    const message = await this.repo.create(content);
    if (this.channel) {
      this.channel.sendToQueue('messages', Buffer.from(content));
      this.channel.sendToQueue('notifications', Buffer.from('new message'));
    }
    return message;
  }

  async findAll() {
    return this.repo.findAll();
  }
}
