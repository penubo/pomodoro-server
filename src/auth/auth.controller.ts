import { Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const user = req.user;
    if (!user) {
      res.redirect('http://localhost:3000/login/');
    } else {
      const jwt = await this.authService.loginByOAuth(
        user.providerId,
        'google',
      );
      res.status(HttpStatus.OK).json(jwt);
    }
  }
}
