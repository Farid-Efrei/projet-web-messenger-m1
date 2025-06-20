import * as amqp from 'amqplib';

async function bootstrap() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue('messages');

  console.log('Worker listening for messages...');
  channel.consume('messages', msg => {
    if (msg) {
      const content = msg.content.toString();
      console.log('Received:', content);
      channel.ack(msg);
    }
  });
}

bootstrap().catch(err => console.error(err));
