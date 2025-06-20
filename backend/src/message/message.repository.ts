import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class MessageRepository {
  private readonly file = join(__dirname, '../../messages.json');
  private messages: { id: number; content: string }[] = [];

  async load() {
    try {
      const data = await fs.readFile(this.file, 'utf-8');
      this.messages = JSON.parse(data);
    } catch {
      this.messages = [];
    }
  }

  private async save() {
    await fs.writeFile(this.file, JSON.stringify(this.messages, null, 2));
  }

  async create(content: string) {
    const message = { id: Date.now(), content };
    this.messages.push(message);
    await this.save();
    return message;
  }

  async findAll() {
    return this.messages;
  }
}
