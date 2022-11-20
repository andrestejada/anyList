import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation()
  signup(){

  }

  @Mutation()
  login(){

  }

  @Query()
  revalidateToken(){

  }
}
