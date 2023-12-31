import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInDto, AuthSignUpDto } from './dto/auth.dto';
import { Public } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() dto: AuthSignUpDto) {
    return await this.authService.signup(dto);
  }

  @Public()
  @Post('signin')
  async signin(@Body() dto: AuthSignInDto, @Res() res) {
    return await this.authService.signin(dto, res);
  }

  @Get('signout')
  signout(@Res() res) {
    return this.authService.signout(res);
  }
}
