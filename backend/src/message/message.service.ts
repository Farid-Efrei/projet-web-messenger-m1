import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  private messages: { id: number; content: string }[] = [];

  create(content: string) {
    const message = { id: Date.now(), content };
    this.messages.push(message);
    return message;
  }

  findAll() {
    return this.messages;
  }
}
