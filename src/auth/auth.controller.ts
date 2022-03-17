import { Controller, Post, HttpException, HttpStatus, Body, Req, Res, HttpCode, UseGuards } from '@nestjs/common';
import { CreateUserstDTO } from "../users/dto/create-user";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "../users/dto/LoginUserDto"
import { JwtAuthGuard } from './jwt-auth.guard';
import { Response } from 'express';
import RequestWithUser from "./requestWithUser.interface";
import { LocalAuthenticationGuard } from './localAuthentication.guard';


@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) { };
    @HttpCode(200) // we use  @HttpCode(200) because NestJS responds with 201 Created for POST requests by default
    @UseGuards(LocalAuthenticationGuard)
    @Post('login')
    async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
        const { user } = request;
        const cookie = this.AuthService.getCookieWithJwtToken(user.id);
        response.setHeader('Set-Cookie', cookie);
        user.password = undefined;
        return response.send(user);
    }

    @Post('register')
    async register(@Body() registrationData: CreateUserstDTO) {
        return this.AuthService.register(registrationData);
    }




    // @Post('register')
    // public async register(@Body() CreateUserstDTO: CreateUserstDTO) {
    //     const result = await this.AuthService.register(CreateUserstDTO,);
    //     if (!result.success) {
    //         throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    //     }
    //     return result;
    // }


    // @Post('login')
    // public async login(@Body() loginUserDto: LoginUserDto) {
    //     return await this.AuthService.login(loginUserDto);
    // }
}
