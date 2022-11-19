import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'item' })
@ObjectType()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string

  @Field(() => String)
  @Column({ type: 'varchar' })
  name: string

  @Field(() => Float)
  @Column()
  quantity: number

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  quantityUnits?: string
}
