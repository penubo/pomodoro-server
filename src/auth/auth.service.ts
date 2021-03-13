import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(id, callback): Promise<any> {
    const user = await this.usersService.findOne(id);
    console.log(user);
    return callback();
  }

  async loginByOAuth(providerId: string, provider: string) {
    const user = await this.usersService.findOAuthUserByProvider(
      providerId,
      provider,
    );

    const payload = { username: user.firstName + user.lastName, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateOAuthUser(profile: any, provider: string): Promise<boolean> {
    const user = await this.usersService.findOAuthUserByProvider(
      profile.id,
      provider,
    );
    if (!user) {
      const { emails, name, photos, id } = profile;

      this.usersService.registerOAuthUser({
        email: emails[0].value,
        firstName: name.givenName,
        lastName: name.familyName,
        providerId: id,
        provider: provider,
        photo: photos[0].value,
      });
    }
    return true;
  }
}
