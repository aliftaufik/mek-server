import { Body, Controller, Post } from '@nestjs/common';
import { UserCrudService } from '../crud/user-crud.service';
import { User } from '../entities/user.entity';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userCrudService: UserCrudService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    const user = await this.userCrudService.create(signUpDto);
    return user;
  }

  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {}
}
