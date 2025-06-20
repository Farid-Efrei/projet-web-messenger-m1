import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';

      console.log('MessageService connected to RabbitMQ');
    } catch (err) {
      console.error('Failed to connect to RabbitMQ', err);
    }
    if (await this.users.isBlocked(recipientId, senderId)) {
      console.log(`Message from ${senderId} to ${recipientId} blocked`);
      return null;
    }
    console.log(`Message ${message.id} stored`);
import { MessageEntity } from './message.entity';
import { UserService } from '../user/user.service';

import { MessageRepository } from './message.repository';


@Injectable()
export class MessageService implements OnModuleInit {
  private channel: amqp.Channel | undefined;

  constructor(
    @InjectRepository(MessageEntity)
    private readonly repo: Repository<MessageEntity>,
    private readonly users: UserService,
  ) {}

  async onModuleInit() {

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


  async create(content: string, recipientId: string, senderId: string, roomId: string) {
    if (await this.users.isBlocked(recipientId, senderId)) return null;
    const message = await this.repo.save({ content, recipientId, senderId, roomId });
    if (this.channel) {
      this.channel.sendToQueue('messages', Buffer.from(content));
      this.channel.sendToQueue(
        `notifications.${recipientId}`,
        Buffer.from('new message'),
      );

  async create(content: string) {
    const message = await this.repo.create(content);
    if (this.channel) {
      this.channel.sendToQueue('messages', Buffer.from(content));
      this.channel.sendToQueue('notifications', Buffer.from('new message'));

    }
    return message;
  }


  async findAll(roomId?: string) {
    if (roomId) {
      return this.repo.find({ where: { roomId } });
    }
    return this.repo.find();

  async findAll() {
    return this.repo.findAll();

  }
}
