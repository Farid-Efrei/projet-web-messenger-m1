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
  async messages(@Args('roomId', { nullable: true }) roomId?: string) {
    return this.messageService.findAll(roomId);
  }

  @Mutation(() => MessageType, { nullable: true })
  @UseGuards(AuthGuard)
  async sendMessage(
    @Args('content') content: string,
    @Args('recipientId') recipientId: string,
    @Args('senderId') senderId: string,
    @Args('roomId') roomId: string,
  ) {
    return this.messageService.create(content, recipientId, senderId, roomId);
  }
}
