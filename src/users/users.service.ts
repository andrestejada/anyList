import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpInput } from 'src/auth/dto/sigup.input';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserInput: SignUpInput) {
    await this.findOneByEmail(createUserInput.email);
    const user = this.userRepository.create({
      ...createUserInput,
      password: bcrypt.hashSync(createUserInput.password, 10),
    });

    return await this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return '';
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if(!user){
      throw new BadRequestException('the email does not exist')
    }
    return user;
  }
  async findOneById(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if(!user){
      throw new BadRequestException('the email does not exist')
    }
    return user;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  block(id: string) {
    return `This action removes a #${id} user`;
  }
}
