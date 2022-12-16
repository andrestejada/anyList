import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/items/entities/item.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SEED_USERS, SEED_ITEMS } from './data/seed-data';
import { UsersService } from '../users/users.service';
import { ItemsService } from 'src/items/items.service';
@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private usersService: UsersService,
    private itemService: ItemsService,
  ) {}

  async executeSeed() {
    await this.deleteDataBase();

    const users = await this.loadUsers();
    await this.loadItems(users);
    return true;
  }

  async loadUsers() {
    const users: User[] = [];

    for (const user of SEED_USERS) {
      users.push(await this.usersService.create(user));
    }
    return users;
  }
  async loadItems(users: User[]) {
    const itemsPromise = [];
    let counter = 0;
    for (const item of SEED_ITEMS) {
      if (counter >= SEED_USERS.length) {
        counter = 0;
      }
      itemsPromise.push(this.itemService.create(item, users[counter]));
      counter++;
    }
    
    const res = await Promise.all(itemsPromise);
    console.log(res)
  }
  async deleteDataBase() {
    await this.itemRepository.createQueryBuilder().delete().where({}).execute();
    await this.userRepository.createQueryBuilder().delete().where({}).execute();
  }
}
