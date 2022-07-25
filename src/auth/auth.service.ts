import { Injectable } from '@nestjs/common';
import { SignupAuthDto, SigninAuthDto } from './dto/';

@Injectable()
export class AuthService {
  signup(signupAuthDto: SignupAuthDto) {
    console.log(signupAuthDto);
    return 'This action adds a new auth';
  }

  signin(signinAuthDto: SigninAuthDto) {
    console.log(signinAuthDto);
    return 'This action adds a new auth';
  }
}
