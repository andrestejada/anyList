import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpInput } from 'src/auth/dto/sigup.input';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ValidRoles } from '../auth/enums/valid-roles.enum';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserInput: SignUpInput) {
    const userFound = await this.findOneByEmail(createUserInput.email);
    if (userFound) {
      throw new BadRequestException('user already exist');
    }
    const user = this.userRepository.create({
      ...createUserInput,
      password: bcrypt.hashSync(createUserInput.password, 10),
    });

    return await this.userRepository.save(user);
  }

  findAll(roles: ValidRoles[]) {
    if (roles.length === 0) {
      return this.userRepository.find();
    }
    return this.userRepository
      .createQueryBuilder('user')
      .andWhere('ARRAY[roles]::varchar[] && ARRAY[:...roles]::varchar[]')
      .setParameter('roles', roles)
      .getMany();
  }

  findOne(id: string) {
    return this.findOneById(id);
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    // if (!user) {
    //   throw new BadRequestException('the email does not exist');
    // }
    return user;
  }
  async findOneById(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('the email does not exist');
    }
    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput, updateBy: User) {
    const userToUpdate = await this.userRepository.preload(updateUserInput);
    if (!userToUpdate) {
      throw new BadRequestException('the user with that id does not exist');
    }
    userToUpdate.lastUpdatedUser = updateBy;
    return await this.userRepository.save(userToUpdate);
  }

  async block(id: string, adminUser: User) {
    const userToBlock = await this.findOneById(id);
    userToBlock.isActive = false;
    userToBlock.lastUpdatedUser = adminUser;
    return this.userRepository.save(userToBlock);
  }
}
