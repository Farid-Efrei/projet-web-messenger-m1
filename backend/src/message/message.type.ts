import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class MessageType {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;

  @Field()
  senderId: string;

  @Field()
  recipientId: string;

  @Field()
  roomId: string;

  @Field()
  createdAt: Date;

  @Field()
  read: boolean;
}
