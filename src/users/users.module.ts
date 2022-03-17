import { Module , forwardRef} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {UserRepository} from './user-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AuthModule} from "../auth/auth.module"
// @Global()//creating global modules might be discouraged and perceived as a bad design decision
@Module({
  imports: [forwardRef(() => AuthModule),TypeOrmModule.forFeature([UserRepository])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],// now UsersService can shared across all other modules
})
export class UsersModule {}
