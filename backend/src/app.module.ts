import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    MessageModule,
  ],
})
export class AppModule {}
