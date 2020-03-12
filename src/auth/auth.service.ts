import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './auth.model';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signupUser(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;

    const newUser = this.userModel({
      username: username,
      password: password,
    });

    const user = await newUser.save();
    return user;
  }

  async signinUser(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const user = await this.userModel.findOne({
      username: username,
      password: password,
    });

    if (user) {
      const accessToken = await this.jwtService.sign(username);
      console.log(accessToken);
      return accessToken;
    } else {
      throw new NotFoundException();
    }
  }
}
