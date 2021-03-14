import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';

describe('AuthService', () => {
  let service: AuthService;
  let usersRepository: Repository<User>;
  const mockUsersRepository = () => ({
    createProduct: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'temp secret',
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [
        {
          provide: getRepositoryToken(User),
          useFactory: mockUsersRepository,
        },
        UsersService,
        AuthService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
