import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    AuthModule,
    MessageModule,
  ],
})
export class AppModule {}
