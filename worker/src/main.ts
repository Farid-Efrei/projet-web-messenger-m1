import * as amqp from 'amqplib';

async function bootstrap() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue('messages');
  await channel.assertQueue('notifications');

  console.log('Worker listening for messages and notifications...');
  channel.consume('messages', msg => {
    if (msg) {
      console.log('Message:', msg.content.toString());
      channel.ack(msg);
    }
  });

  channel.consume('notifications', msg => {
    if (msg) {
      console.log('Notification:', msg.content.toString());
      channel.ack(msg);
    }
  });
}

bootstrap().catch(err => console.error(err));
