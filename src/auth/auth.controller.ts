import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signIn')
  logIn() {
    return this.authService.signIn();
  }

  @Post('/signUp')
  signUp(@Body() body: SignUpDto) {    
    return this.authService.signUp(body);
  }
}
