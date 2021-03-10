import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('login')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
