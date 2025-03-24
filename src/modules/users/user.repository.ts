import { BadRequestException, Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateUserDto } from "src/common/dtos/user.dto";
import { IUser } from "src/common/interfaces/users.interface";

@Injectable()
export class UsersRepository {
        
    private users: IUser[] = [
        { id: 1, name: 'Juan Pérez', email: 'juan.perez@example.com', password: "hashedpassword1", address: "Av. Siempre Viva 123", phone: "+54 9 291 4567890", country: "Argentina", city: "Bahía Blanca" },
        { id: 2, name: 'María López', email: 'maria.lopez@example.com', password: "hashedpassword2", address: "Calle Falsa 456", phone: "+34 612 345 678", country: "España", city: "Madrid" },
        { id: 3, name: 'Carlos Ramírez', email: 'carlos.ramirez@example.com', password: "hashedpassword3", address: "Rua das Flores 789", phone: "+55 21 98765-4321", country: "Brasil", city: "Río de Janeiro" },
        { id: 4, name: 'Sofía Gómez', email: 'sofia.gomez@example.com', password: "hashedpassword4", address: "Main Street 101", phone: "+1 305 987 6543", country: "Estados Unidos", city: "Miami" },
    ];
    

    async getUsers(page: number, limit: number) {
        const startIndex = (page - 1) * limit; 
        const endIndex = startIndex + Number(limit); // es string el limit sin el Number()

        console.log(`limit ${limit}`);
        console.log(`inicio ${startIndex}, fin ${endIndex}`);
        

        const paginatedUsers = this.users.slice(startIndex, endIndex);

        return paginatedUsers.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
    }

    async getAllUsers() {
        return this.users
    }

    async getUserById(id: number) {
        const user = this.users.find(user => user.id === id);
        if (!user) return "Usuario no encontrado"; 
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;    }

    async createUser(user: IUser) {
        const userInstance = plainToInstance(CreateUserDto, user);
        const errors = await validate(userInstance);
        
        if (errors.length > 0) {
            throw new BadRequestException('Datos inválidos para el usuario.');
        }
        this.users.push(user);
        return `Usuario creado con id ${user.id}`;
    }
    async updateUser(id: number, updatedUser: IUser) {

        const userInstance = plainToInstance(IUser, updatedUser);
        const errors = await validate(userInstance);
        
        if (errors.length > 0) {
            throw new BadRequestException('Datos inválidos para el usuario.');
        }

        let didUpdate = false;
        this.users = this.users.map(user => {
            if (user.id === id) {
                didUpdate = true;
                return { ...user, ...updatedUser };  
            }
            return user;
        });
    
        if (didUpdate) {
            return `Usuario con id ${id} actualizado`;
        }
        return `Usuario con id ${id} no encontrado`;
    }
    

    deleteUser(id: number) {
        const userCountBefore = this.users.length;
        this.users = this.users.filter(user => user.id !== id);
        const userCountAfter = this.users.length;

        if (userCountBefore === userCountAfter) {
            return "Usuario no encontrado"; 
        }

        return `Usuario con id ${id} eliminado`;
    }
}