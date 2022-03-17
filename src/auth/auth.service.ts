import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { RegisterUserstDTO } from "./dto/register-user.dto";
import { LoginUserDto } from "../users/dto/LoginUserDto"
import * as bcrypt from "bcrypt";
import { PostgresErrorCode } from "./postgresErrorCodes.enum";
import { TokenPayload } from "./tokenPayload.interface"


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    protectedRoute() {
        return this.usersService.protectedRoute()
    }

    // async register(userDto: CreateUserstDTO){
    //     let status: any= {
    //         message: 'user registered successfully',
    //     };
    //     try {
    //         await this.usersService.createUser(userDto);
    //     } catch (err) {
    //         status = {
    //             message: err,
    //         };
    //     }
    //     return status;
    // }


    public async register(registrationData: RegisterUserstDTO) {
        const hashedPassword = await bcrypt.hash(registrationData.password, 10);
        try {
            const createdUser = await this.usersService.create({
                ...registrationData,
                password: hashedPassword
            });
            createdUser.password = undefined;
            return createdUser;
        } catch (error) {
            if (error?.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // async login(loginUserDto: LoginUserDto) {    
    //     // find user in db    
    //     const user = await this.usersService.findByLogin(loginUserDto);

    //     // generate and sign token    
    //     const token = this.createToken(user);

    //     return {
    //         name: user.name,
    //         email: user.email, 
    //         ...token,    
    //     };  
    // }

    // private createToken({ email }): any {
    //     const user= { email };    
    //     const accessToken = this.jwtService.sign(user);    
    //     return {
    //         // expiresIn: process.env.EXPIRESIN,
    //         accessToken,    
    //     };  
    // }
    public async getAuthenticatedUser(email: string, plainTextPassword: string) {
        try {
            const user = await this.usersService.getByEmail(email);
            await this.verifyPassword(plainTextPassword, user.password);
            user.password = undefined;
            return user;
        } catch (error) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }

    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(
            plainTextPassword,
            hashedPassword
        );
        if (!isPasswordMatching) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }

    public getCookieWithJwtToken(userId: number) {
        const payload: TokenPayload = { userId };
        const token = this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${process.env.TOKEN_EXPIRE_TIME}`;
    }
}
