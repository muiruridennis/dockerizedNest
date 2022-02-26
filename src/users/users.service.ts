import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {UserRepository} from './user-repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserstDTO } from "./dto/create-user"


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private UserRepository: UserRepository
    ){}

    async getAllUsers(){
       const users = await this.UserRepository.find();
       return users;
    };

    async getUserById (userId: number) {
        const foundUser = await this.UserRepository.findOne(userId);
        if (!foundUser) {
            throw new HttpException(`User ${userId} not found`, HttpStatus.NOT_FOUND);
           
          }
          return foundUser;

    };

    async createUser (CreateUserstDTO : CreateUserstDTO) {
        try {
            const newUser = await this.UserRepository.create(CreateUserstDTO);
            await this.UserRepository.save(newUser);
            return newUser;
            
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
            
        }
    };

    async editUser (userId:number, newValues:CreateUserstDTO) { //needs review
        const updatedUser = await this.UserRepository.findOne(userId);
        if (!updatedUser){
            throw new HttpException(`User ${userId} not found`, HttpStatus.NOT_FOUND);
        }
        await this.UserRepository.update(userId, newValues );
        return await this.UserRepository.findOne(userId);

    };

    async deleteUser (userId:number) {
        const deleteResponse = await this.UserRepository.delete(userId);
        if (!deleteResponse.affected) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return "User deleted successfully"
    };
}