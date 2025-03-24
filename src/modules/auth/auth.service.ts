import { BadRequestException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersRepository } from "../users/user.repository";

@Injectable()

export class AuthService {
    
    constructor(private readonly usersRepository: UsersRepository) {}

    getAuth() {
        return "Get auth"
    }
    
    async loginUser({email, password}) {
        if(!email || !password) {
            throw new BadRequestException('Campos incompletos');
        }
        const users = await this.usersRepository.getAllUsers()
    
        const foundUser = users.find(user => user.email === email);

        if(!foundUser || foundUser.password !== password) {
            throw new UnauthorizedException(`Credenciales inválidas`)
        }
    }
}