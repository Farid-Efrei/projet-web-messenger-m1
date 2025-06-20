export function getRabbitUrl(): string {
  return process.env.RABBITMQ_URL || 'amqp://localhost';
}
