import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'item' })
@ObjectType()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  name: string;

  // @Field(() => Float)
  // @Column()
  // quantity: number;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  quantityUnits?: string;

  @ManyToOne(() => User, (user) => user.item)
  user: User;
}
