import { Field, InputType } from "@nestjs/graphql"
import { IsEmail, IsNotEmpty, MinLength} from "class-validator"

@InputType()
export class LoginInput {
    @IsEmail()
    @Field(()=>String)
    email:string

    @MinLength(6)
    @Field(()=>String)
    password:string
}