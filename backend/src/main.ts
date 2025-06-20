import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/', express.static(join(__dirname, '../../frontend')));
  await app.listen(3000);
  console.log('Server started on http://localhost:3000');
  console.log('GraphQL available at http://localhost:3000/graphql');
}
bootstrap();
