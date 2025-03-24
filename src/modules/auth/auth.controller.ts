import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ICredential } from "src/common/interfaces/auth.interface";
import { LoginUserDto } from "src/common/dtos/auth.dto";

@Controller("auth")

export class AuthController {
    constructor(private readonly AuthService: AuthService) {}

    @Get()
    getAuth() {
        return this.AuthService.getAuth();
    }

    @Post("/signin")
    loginUser(@Body() loginData: LoginUserDto) {
        return this.AuthService.loginUser(loginData)
    }   
};