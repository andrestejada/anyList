import { Injectable, BadRequestException, UnauthorizedException, BadGatewayException } from '@nestjs/common';
import { SignUpInput } from './dto/sigup.input';
import { UsersService } from '../users/users.service';
import { AuthResponse } from './types/auth-response';
import { LoginInput } from './dto/login.input';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
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
    if(!user){
      throw new BadGatewayException('user does not found')
    }
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

  revalidateToken(user:User):AuthResponse{
    const token = this.jwtService.sign({
      id:user.id
    })
    return {
      token,
      user
    }
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
