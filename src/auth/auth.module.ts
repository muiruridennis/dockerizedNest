import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {UsersModule} from "../users/users.module"; // we have access to all of the exported providers from UsersModule
import { JwtStrategy } from './jwt.strategy';
 import { LocalStrategy } from './local.strategy';

@Module({
  imports: [forwardRef(() => UsersModule), PassportModule,JwtModule.register({ //we import user module so that we can be able to use UserServices
    secret: process.env.JWT_SECRET,
    signOptions:{expiresIn: process.env.TOKEN_EXPIRE_TIME}
  })],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
  
})
export class AuthModule {}
