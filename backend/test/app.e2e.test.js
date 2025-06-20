import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

let app: INestApplication;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
  app = moduleRef.createNestApplication();
  await app.init();
});

afterAll(async () => {
  await app.close();
});

test('graphql hello', async () => {
  const query = { query: '{ messages { id content recipientId } }' };
  const res = await request(app.getHttpServer())
    .post('/graphql')
    .set('Authorization', 'Bearer ' + (await login()))
    .send(query);
  expect(res.status).toBe(200);
});

async function login() {
  const res = await request(app.getHttpServer())
    .post('/graphql')
    .send({ query: 'mutation{login(username:"admin",password:"password")}' });
  return res.body.data.login;
}
