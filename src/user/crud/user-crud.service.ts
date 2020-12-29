import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserCrudService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create({ username, email, password }: CreateUserDto) {
    const user = new User({ username, email, password });
    return this.userRepository.save(user);
  }

  // findAll() {
  //   return `This action returns all sample`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} sample`;
  // }

  // update(id: number, updateSampleDto: UpdateSampleDto) {
  //   return `This action updates a #${id} sample`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} sample`;
  // }
}
