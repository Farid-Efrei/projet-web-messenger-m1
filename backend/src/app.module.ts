import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './message/message.entity';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL ||
        'postgres://postgres:postgres@localhost:5432/messenger',
      entities: [UserEntity, MessageEntity],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    AuthModule,
    UserModule,
    MessageModule,
  ],
})
export class AppModule {}
