import { InputType, Field, Float } from '@nestjs/graphql'
import { IsOptional ,IsString,IsNumber,IsPositive } from 'class-validator'

@InputType()
export class CreateItemInput {
  @Field(() => String)
  @IsString()
  name: string

  // @Field(() => Float)
  // @IsNumber()
  // @IsPositive()
  // quantity: number

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  quantityUnits?: string

}
