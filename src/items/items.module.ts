import { Module } from '@nestjs/common'
import { ItemsService } from './items.service'
import { ItemsResolver } from './items.resolver'

@Module({
  providers: [ItemsResolver, ItemsService],
  exports: [ItemsResolver, ItemsService],
})
export class ItemsModule {}
