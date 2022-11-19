import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm/repository/Repository'
import { CreateItemInput } from './dto/create-item.input'
import { UpdateItemInput } from './dto/update-item.input'
import { Item } from './entities/item.entity'

@Injectable()
export class ItemsService {
  constructor (
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}
  async create (createItemInput: CreateItemInput) {
    const newItem = this.itemRepository.create(createItemInput)
    await this.itemRepository.save(newItem)
    return newItem
  }

  async findAll () {
    return this.itemRepository.find()
  }

  async findOne (id: string) {
    const item = await this.itemRepository.findOneBy({ id })
    if (!item) {
      throw new NotFoundException(`The item with the id ${id} does not exist`)
    }
    return item
  }

  async update (id: string, updateItemInput: UpdateItemInput) {
    // const itemToUpdate = await this.findOne(id)
    // this.itemRepository.save(itemToUpdate)
    const item = await this.itemRepository.preload( updateItemInput )
    if (!item) {
      throw new NotFoundException(`The item with the id ${id} does not exist`)
    }
    await this.itemRepository.save(item)
    return item
  }

  async remove (id: string) {
    const item = await this.findOne(id)
    await this.itemRepository.remove(item)
    return {...item,id} 
  }
}
