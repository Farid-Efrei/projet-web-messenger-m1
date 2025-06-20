const assert = require('assert');
const { MessageService } = require('../src/message/message.service');
const { MessageRepository } = require('../src/message/message.repository');

class InMemoryRepo extends MessageRepository {
  constructor() { super(); this.messages = []; }
  async load() {}
  async save() {}
}

test('create and fetch message', async () => {
  const repo = new InMemoryRepo();
  const service = new MessageService(repo);
  await service.onModuleInit();
  await service.create('hello');
  const msgs = await service.findAll();
  assert.equal(msgs.length, 1);
  assert.equal(msgs[0].content, 'hello');
});
