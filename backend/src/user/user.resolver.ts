import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly users: UserService) {}

  @Mutation(() => String)
  async signup(@Args('username') u: string, @Args('password') p: string) {
    const user = await this.users.create(u, p);
    return user.id;
  }

  @Mutation(() => Boolean)
  async blockUser(@Args('userId') userId: string, @Args('targetId') targetId: string) {
    await this.users.blockUser(userId, targetId);
    return true;
  }
}
