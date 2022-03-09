import { Injectable } from '@nestjs/common';
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import {CreateUserstDTO} from "../users/dto/create-user";
import { UserDto } from '../users/dto/UserDto';
import {LoginUserDto} from "../users/dto/LoginUserDto"


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }
   
    protectedRoute() {
        return this.usersService.protectedRoute()
    }

    async register(userDto: CreateUserstDTO){
        let status: any= {
            message: 'user registered successfully',
        };
        try {
            await this.usersService.createUser(userDto);
        } catch (err) {
            status = {
                message: err,
            };
        }
        return status;
    }
    async login(loginUserDto: LoginUserDto) {    
        // find user in db    
        const user = await this.usersService.findByLogin(loginUserDto);
        
        // generate and sign token    
        const token = this.createToken(user);
        
        return {
            name: user.name,
            email: user.email, 
            ...token,    
        };  
    }
    
    private createToken({ email }): any {
        const user= { email };    
        const accessToken = this.jwtService.sign(user);    
        return {
            // expiresIn: process.env.EXPIRESIN,
            accessToken,    
        };  
    }

}
