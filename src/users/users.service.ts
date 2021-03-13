import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findOne(id: number) {
    return this.usersRepository.findOne(id);
  }

  registerOAuthUser(userData: Partial<User>) {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  findOAuthUserByProvider(providerId: string, provider: string): Promise<User> {
    return this.usersRepository.findOne({ providerId, provider });
  }
}
