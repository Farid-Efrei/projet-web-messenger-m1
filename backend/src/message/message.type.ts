import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class MessageType {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;
}
