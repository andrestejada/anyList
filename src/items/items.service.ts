import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { Item } from './entities/item.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}
  async create(createItemInput: CreateItemInput, user: User) {
    const newItem = this.itemRepository.create({ ...createItemInput, user });
    await this.itemRepository.save(newItem);
    return newItem;
  }

  async findAll(user: User) {
    console.log(user);
    return this.itemRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
      relations: {
        user: true,
      },
    });
  }

  async findOne(id: string, user: User) {
    const item = await this.itemRepository.findOneBy({
      id,
      user: {
        id: user.id,
      },
    });
    if (!item) {
      throw new NotFoundException(`The item with the id ${id} does not exist`);
    }
    return item;
  }

  async update(id: string, updateItemInput: UpdateItemInput, user: User) {
    // const itemToUpdate = await this.findOne(id)
    // this.itemRepository.save(itemToUpdate)
    await this.findOne(id, user);
    const item = await this.itemRepository.preload(updateItemInput);
    if (!item) {
      throw new NotFoundException(`The item with the id ${id} does not exist`);
    }
    await this.itemRepository.save(item);
    return item;
  }

  async remove(id: string, user: User) {
    const item = await this.findOne(id, user);
    await this.itemRepository.remove(item);
    return { ...item, id };
  }
}
