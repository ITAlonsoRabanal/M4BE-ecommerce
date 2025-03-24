import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { IUser } from "src/common/interfaces/users.interface";
import { AuthGuard } from "../auth/auth.guard";
import { CreateUserDto, UpdateUserDto } from "src/common/dtos/user.dto";

@Controller("users")

export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @UseGuards(AuthGuard)
    @HttpCode(200)
    getUsers(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 5,
    ) {
        return this.usersService.getUsers(page, limit);
    }

    @Get(":id")
    @UseGuards(AuthGuard)
    getUserById(@Param("id", ParseUUIDPipe) id: string) {        
        return this.usersService.getUserById(id)
    }

    @Post() 
    @HttpCode(201)
    createUser(@Body() user: CreateUserDto) {
        return this.usersService.createUser(user);
    }

    @Put(":id")
    @UseGuards(AuthGuard)
    updateUser(@Param("id", ParseUUIDPipe) id: string, @Body() user: UpdateUserDto) {
        return this.usersService.updateUser(id, user)
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    deleteUser(@Param("id", ParseUUIDPipe) id: string) {
        return this.usersService.deleteUser(id)
    }

}; 