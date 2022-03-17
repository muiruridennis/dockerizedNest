import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserRepository } from './user-repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserstDTO } from "./dto/create-user";
import { LoginUserDto } from "./dto/LoginUserDto";

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
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        return user;
    }

    async getAllUsers() {
        const users = await this.UserRepository.find();
        return users;
    };
    async getById(id: number) {
        const user = await this.UserRepository.findOne({ id });
        if (user) {
          return user;
        }
        throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
      }

    async getByEmail(email: string) {
        const user = await this.UserRepository.findOne({ email });
        if (user) {
          return user;
        }
        throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
      }

   
    async createUser(userData: CreateUserstDTO) {
        const { name, password, email } = userData;

        // check if the user exists in the db    
        const userExists = await this.UserRepository.findOne({
            where: { email }
        });
        if (userExists) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const newUser = await this.UserRepository.create({ name, password, email, });
        await this.UserRepository.save(newUser);
        return newUser;
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

    async create(userData: CreateUserstDTO) {
        const newUser = await this.UserRepository.create(userData);
        await this.UserRepository.save(newUser);
        return newUser;
      }


    
}