import { Controller, Post, HttpException, HttpStatus, Body } from '@nestjs/common';
import { CreateUserstDTO } from "../users/dto/create-user";
import { AuthService } from "./auth.service";
import {LoginUserDto} from "../users/dto/LoginUserDto"

@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) { };
    @Post('register')
    public async register(@Body() CreateUserstDTO: CreateUserstDTO,) {
        const result = await this.AuthService.register(CreateUserstDTO,);
        if (!result.success) {
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }


    @Post('login')
    public async login(@Body() loginUserDto: LoginUserDto) {
        return await this.AuthService.login(loginUserDto);
    }
}
