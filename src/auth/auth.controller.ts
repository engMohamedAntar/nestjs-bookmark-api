import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/dto/signup.dto';
import { SignInDto } from 'src/dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signIn')
  logIn(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }

  @Post('/signUp')
  signUp(@Body() body: SignUpDto) {    
    return this.authService.signUp(body);
  }
}
