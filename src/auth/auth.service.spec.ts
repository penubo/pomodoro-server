import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let usersService;
  const mockUsersService = () => ({
    findOAuthUserByProvider: jest.fn(),
    registerOAuthUser: jest.fn(),
    findOne: jest.fn(),
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
          provide: UsersService,
          useFactory: mockUsersService,
        },
        AuthService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return jwt token of user when login success', async () => {
    const idValue = 1;
    const firstName = 'yongjoon';
    const lastName = 'kim';
    const providerId = '1234';
    const provider = 'google';
    usersService.findOAuthUserByProvider.mockResolvedValue({
      id: idValue,
      firstName: firstName,
      lastName: lastName,
      email: 'yongjoon@gmail.com',
      photo: null,
      providerId: providerId,
      provider: provider,
    });

    const { access_token } = await service.loginByOAuth(providerId, provider);
    const { username, id } = jwtService.decode(access_token) as {
      username: string;
      id: number;
      iat: number;
      exp: number;
    };

    expect(usersService.findOAuthUserByProvider).toHaveBeenCalledWith(
      providerId,
      provider,
    );
    expect(usersService.findOAuthUserByProvider).toHaveBeenCalledTimes(1);
    expect(username).toBe(`${firstName}${lastName}`);
    expect(id).toBe(idValue);
  });
});
