import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ItemsModule } from '../items/items.module';
import { ItemsService } from 'src/items/items.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ItemsModule],
  providers: [UsersResolver, UsersService, ItemsService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
