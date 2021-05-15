import {Controller, Post, Request, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";

import {AuthService} from "../../services/auth/auth.service";

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return {
      user: req.user,
      access_token: this.authService.generateJwt(req.user)
    };
  }
}
