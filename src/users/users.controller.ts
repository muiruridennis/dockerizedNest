
import { Controller, Get, Param, Post, Body, Delete, Query, Patch } from '@nestjs/common';
import { UsersService } from "./users.service";
import { CreateUserstDTO } from './dto/create-user';

@Controller('users')
export class UsersController {
    constructor(private UsersService: UsersService) { };
    @Get()
    async getUsers() {
        const users = await this.UsersService.getAllUsers();
        return users
    };

    @Get(":userId")
    async getUser(@Param("userId") userId: string) {
        const user = await this.UsersService.getUserById(Number(userId));
        return user;
    };

    @Post()
    async addUser(@Body() CreateUserstDTO: CreateUserstDTO) {
        const newUser = await this.UsersService.createUser(CreateUserstDTO);
        return newUser;
    };

    @Patch(":userId")
    async editUser(@Param("userId") userId, @Body() CreateUserstDTO: CreateUserstDTO) {
        const editedUser = await this.UsersService.editUser(userId, CreateUserstDTO);
        return editedUser;
    };

    @Delete(":userId")
    async deleteUser(@Param("userId") userId: number) {
        const deletedUser = await this.UsersService.deleteUser(userId);
        return deletedUser;
    }

}
