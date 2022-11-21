import { Injectable } from '@nestjs/common';
import { SignUpInput } from './dto/sigup.input';
import { UsersService } from '../users/users.service';
import { AuthResponse } from './types/auth-response';

@Injectable()
export class AuthService {

    constructor(private usersService:UsersService){}

    async signUp(signUpInput:SignUpInput):Promise<AuthResponse>{
        const user = await this.usersService.create(signUpInput)

        return {
            user,
            token:'this is a jwt token'
        } 
    }
}
