import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { OAuth2Strategy, VerifyFunction } from 'passport-google-oauth';

@Injectable()
export class GoogleStrategy extends PassportStrategy(OAuth2Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID:
        '435036087399-r9a9oocu8lraebtuqemen1gt6ur893sb.apps.googleusercontent.com',
      clientSecret: 'wk8Hy3pJSyLz6BimYzaT5fEL',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    cb: VerifyFunction,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;
    await this.authService.validateOAuthUser(profile, 'google');
    const user = {
      id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      refreshToken,
    };
    cb(null, user);
  }
}
