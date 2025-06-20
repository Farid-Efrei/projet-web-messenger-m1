import assert from 'assert';
import { getRabbitUrl } from '../src/config.ts';

test('getRabbitUrl uses env var', () => {
  process.env.RABBITMQ_URL = 'amqp://test';
  assert.equal(getRabbitUrl(), 'amqp://test');
});

test('getRabbitUrl falls back to default', () => {
  delete process.env.RABBITMQ_URL;
  assert.equal(getRabbitUrl(), 'amqp://localhost');
});
