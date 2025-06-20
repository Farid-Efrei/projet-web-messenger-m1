import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageType } from './message.type';
import { AuthGuard } from '../auth/auth.guard';

@Resolver(() => MessageType)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Query(() => [MessageType])
  @UseGuards(AuthGuard)
  async messages() {
    return this.messageService.findAll();
  }

  @Mutation(() => MessageType)
  @UseGuards(AuthGuard)
  async sendMessage(
    @Args('content') content: string,
    @Args('recipientId') recipientId: string,
  ) {
    return this.messageService.create(content, recipientId);
  }
}
