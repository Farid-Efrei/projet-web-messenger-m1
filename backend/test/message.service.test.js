const assert = require('assert');
const { DataSource } = require('typeorm');
const { MessageService } = require('../src/message/message.service');
const { MessageEntity } = require('../src/message/message.entity');

test('create and fetch message', async () => {
  const ds = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    entities: [MessageEntity],
    synchronize: true,
  });
  await ds.initialize();
  const repo = ds.getRepository(MessageEntity);
  const userService = { isBlocked: async () => false };
  const service = new MessageService(repo, userService);
  await service.onModuleInit();
  await service.create('hello', 'u1', 'u2', 'general');
  const msgs = await service.findAll();
  assert.equal(msgs.length, 1);
  assert.equal(msgs[0].content, 'hello');
});
