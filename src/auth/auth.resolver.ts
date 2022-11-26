import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { SignUpInput } from './dto/sigup.input';
import { JwtGuard } from './guards/jwt-auth.guard';
import { AuthResponse } from './types/auth-response';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { ValidRoles } from './enums/valid-roles.enum';
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'singup' })
  signup(@Args('signUpInput') signUpInput: SignUpInput): Promise<AuthResponse> {
    return this.authService.signUp(signUpInput);
  }

  @Mutation(() => AuthResponse, { name: 'singin' })
  login(@Args('loginInput') loginInput: LoginInput): Promise<AuthResponse> {
    return this.authService.login(loginInput);
  }

  @UseGuards(JwtGuard)
  @Query(() => AuthResponse, { name: 'revalidateToken' })
  revalidateToken(@CurrentUser([ValidRoles.admin]) user: User) {
    return this.authService.revalidateToken(user);
  }
}
