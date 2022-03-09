import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {UsersModule} from "../users/users.module";
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [forwardRef(() => UsersModule), PassportModule,JwtModule.register({ //we import user module so that we can be able to use UserServices
    secret: process.env.JWT_SECRET,
    signOptions:{expiresIn: 3600}
  })],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
  
})
export class AuthModule {}
