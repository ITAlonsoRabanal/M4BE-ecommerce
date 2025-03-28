import { BadRequestException, ConflictException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { RegisterUserDto } from "src/common/dtos/user.dto";
import { UsersService } from "../users/users.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { Role } from "src/common/interfaces/roles.enum";

@Injectable()

export class AuthService {
    
    
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async loginUser({email, password}) { 
        if(!email || !password) {
            throw new BadRequestException('Campos incompletos');
        }
        const dbUser = await this.usersService.getUserByEmail(email);
        if(!dbUser) {
            throw new BadRequestException(`Credenciales incorrectas`)
        }
        const isPasswordValid = await bcrypt.compare(password, dbUser?.password)
        if(!isPasswordValid) {
            throw new BadRequestException(`Credenciales incorrectas`)
        }
        const userPayload = {   
            sub: dbUser.id, 
            id: dbUser.id,
            email: dbUser.email,
            roles: [dbUser.isAdmin ? Role.Admin : Role.User]
        }

        const token = this.jwtService.sign(userPayload)

        return {success: `Inicio de sesión éxitoso`, token}
    }

    async registerUser(user: RegisterUserDto) {
        const existingMail = await this.usersService.getUserByEmail(user.email)
        if(existingMail) {
            throw new BadRequestException(`El email ya está en uso`)
        }

        const hashedPassword = await bcrypt.hash(user.password, 10)
        if(!hashedPassword) {
            throw new ConflictException(`Falló la encriptación`)
        }


        const newUser = await this.usersService.createUser({ ...user, password: hashedPassword})
        const {password, ...safeUser} = newUser 
        return safeUser;
    }
}