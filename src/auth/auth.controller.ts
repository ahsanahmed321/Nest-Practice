import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  @UsePipes(ValidationPipe)
  async signupUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signupUser(createUserDto);
  }

  @Post('signin')
  @UsePipes(ValidationPipe)
  async signinUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signinUser(createUserDto);
  }
}
