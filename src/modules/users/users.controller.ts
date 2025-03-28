import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Put, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "../../common/guards/auth.guard";
import { UpdateUserDto } from "src/common/dtos/user.dto";
import { Roles } from "src/common/decorators/roles.decorator";
import { Role } from "src/common/interfaces/roles.enum";
import { RolesGuard } from "src/common/guards/roles.guard";

@Controller("users")

export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
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