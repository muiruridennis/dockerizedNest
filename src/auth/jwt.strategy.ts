import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import {TokenPayload} from './tokenPayload.interface';
import { UsersService } from '../users/users.service';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService,) {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),when using bearer token
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies?.Authentication;
      }]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: TokenPayload) {
    return this.userService.getById(payload.userId);
  }
  // async validate(email: string, password: string): Promise<User> {
  //   return this.authenticationService.getAuthenticatedUser(email, password);
  // }
}