import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { SignUpInput } from './dto/sigup.input';
import { UsersService } from '../users/users.service';
import { AuthResponse } from './types/auth-response';
import { LoginInput } from './dto/login.input';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,private jwtService:JwtService) {}

  async signUp(signUpInput: SignUpInput): Promise<AuthResponse> {
    const user = await this.usersService.create(signUpInput);
    const token = this.jwtService.sign({
      id:user.id
    })
    return {
      user,
      token,
    };
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const user = await this.usersService.findOneByEmail(loginInput.email);
    
    const isValidPassword = await bcrypt.compare(
      loginInput.password,
      user.password,
    );
    
    if (!isValidPassword) {
      throw new BadRequestException('email or password wrong');
    }

    const token = this.jwtService.sign({
      id:user.id
    })
    
    return {
      token,
      user,
    };
  }

  async revalidateToken(){
    return 'valid'
  }

  async validateUser(id:string){
   const user =  await this.usersService.findOneById(id)
   if(!user.isActive){
    throw new UnauthorizedException('user not active')
   }

   delete user.password

   return user
  }
}
