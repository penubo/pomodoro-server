import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(id, callback): Promise<any> {
    const user = await this.usersService.findOne(id);
    console.log(user);
    return callback();
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

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User Info from Google',
      user: req.user,
    };
  }
}
