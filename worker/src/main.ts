import * as amqp from 'amqplib';
import { getRabbitUrl } from './config';

async function bootstrap() {
  const connection = await amqp.connect(getRabbitUrl());
  const channel = await connection.createChannel();
  await channel.assertQueue('messages');
  await channel.assertQueue('notifications.u2');

  console.log('Worker listening for messages and notifications...');
  channel.consume('messages', msg => {
    if (msg) {
      console.log('Message:', msg.content.toString());
      channel.ack(msg);
    }
  });

  channel.consume('notifications.u2', msg => {
    if (msg) {
      console.log('Notification:', msg.content.toString());
      channel.ack(msg);
    }
  });
}

bootstrap().catch(err => console.error(err));
