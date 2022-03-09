import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserRepository } from './user-repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserstDTO } from "./dto/create-user";
import { LoginUserDto } from "./dto/LoginUserDto";
import { UserDto } from "./dto/UserDto";
import * as bcrypt from "bcrypt";



@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private UserRepository: UserRepository
    ) { }

    async findByLogin({email, password} : LoginUserDto) {
        const user = await this.UserRepository.findOne({ where: { email } });

        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        // compare passwords    
        const passwordAreEqual = await bcrypt.compare(password, user.password);

        if (!passwordAreEqual) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        return user;
    }

    async getAllUsers() {
        const users = await this.UserRepository.find();
        return users;
    };

    async findOne(options?: object) {
        const user = await this.UserRepository.findOne(options);
        return user;
    }


    async findByPayload({ email }) {
        return await this.UserRepository.findOne({
            where: { email }
        });
    }

   
    async createUser(userDto: CreateUserstDTO) {
        const { name, password, email } = userDto;

        // check if the user exists in the db    
        const userInDb = await this.UserRepository.findOne({
            where: { email }
        });
        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const user = await this.UserRepository.create({ name, password, email, });
        await this.UserRepository.save(user);
        return user;
    }
    protectedRoute (){
        return "this is a protected Route"
    }

    async getUserById(userId: number) {
        const foundUser = await this.UserRepository.findOne(userId);
        if (!foundUser) {
            throw new HttpException(`User  not found`, HttpStatus.NOT_FOUND);

        }
        return foundUser;

    };


    
}