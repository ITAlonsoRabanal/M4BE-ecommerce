import { Body, Controller, Get, Post, Req, UsePipes } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "src/common/dtos/auth.dto";
import { RegisterUserDto } from "src/common/dtos/user.dto";
import { MatchPasswordPipe } from "src/common/pipes/matchPasswords.pipe";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";

@ApiTags('Auth')
@Controller("auth")

export class AuthController {
    constructor(private readonly AuthService: AuthService) {}

    @Post("signin")
    loginUser(@Body() loginData: LoginUserDto) {
        return this.AuthService.loginUser(loginData)
    }   

    @Post('signup')
    @UsePipes(MatchPasswordPipe)
    registerUser(@Body() user: RegisterUserDto) {
        return this.AuthService.registerUser(user)
    }

    @Get('auth0/protected')
    getAuth0Protected(@Req() req: Request) {
        
        return JSON.stringify(req.oidc.user)
    }
};