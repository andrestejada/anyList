import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql'
import { ItemsService } from './items.service'
import { Item } from './entities/item.entity'
import { CreateItemInput } from './dto/create-item.input'
import { UpdateItemInput } from './dto/update-item.input'
import { ParseUUIDPipe } from '@nestjs/common'

@Resolver(() => Item)
export class ItemsResolver {
  constructor (private readonly itemsService: ItemsService) {}

  @Mutation(() => Item)
  createItem (@Args('createItemInput') createItemInput: CreateItemInput) {
    return this.itemsService.create(createItemInput)
  }

  @Query(() => [Item], { name: 'getAllItems' })
  findAll () {
    return this.itemsService.findAll()
  }

  @Query(() => Item, { name: 'getOneItem' })
  findOne (@Args('id', { type: () => ID }) id: string) {
    return this.itemsService.findOne(id)
  }

  @Mutation(() => Item,{name:'updateItem'})
  updateItem (@Args('updateItemInput') updateItemInput: UpdateItemInput) {
    return this.itemsService.update(updateItemInput.id, updateItemInput)
  }

  @Mutation(() => Item)
  removeItem (@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.itemsService.remove(id)
  }
}
