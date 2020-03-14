import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './auth.model';
import { JwtPayload } from './jwt-payload.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret',
    });
  }

  async validate(payload: JwtPayload) {
    console.log(payload);
    //const { username } = payload;
    //console.log('payload', payload);
    const user = await this.userModel.findOne({ username: payload });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
