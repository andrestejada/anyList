import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';
import { UsersModule } from '../users/users.module';
import { ItemsModule } from '../items/items.module';

@Module({
  providers: [SeedResolver, SeedService],
  imports: [UsersModule, ItemsModule],
})
export class SeedModule {}
