import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { MessageType } from './message.type';

@Resolver(() => MessageType)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Query(() => [MessageType])
  messages() {
    return this.messageService.findAll();
  }

  @Mutation(() => MessageType)
  sendMessage(@Args('content') content: string) {
    return this.messageService.create(content);
  }
}
