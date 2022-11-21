import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInput } from './dto/sigup.input';
import { AuthResponse } from './types/auth-response';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => AuthResponse, { name: 'singup' })
  signup(@Args('signUpInput') signUpInput: SignUpInput):Promise<AuthResponse> {
    return this.authService.signUp(signUpInput)
  }

  // @Mutation()
  // login() {

  // }

  // @Query()
  // revalidateToken() {

  // }
}
