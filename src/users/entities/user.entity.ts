import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Item } from 'src/items/entities/item.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'varchar' })
  @Field(() => String)
  fullName: string;

  @Column({ type: 'varchar', unique: true })
  @Field(() => String)
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', array: true, default: ['user'] })
  @Field(() => [String])
  roles: string[];

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.lastUpdatedUser, {
    nullable: true,
    lazy: true,
  })
  @JoinColumn()
  @Field(() => User, { nullable: true })
  lastUpdatedUser?: User;

  @OneToMany(() => Item, (item) => item.user, { lazy: true })
  @Field(() => [Item])
  item: Item[];
}
