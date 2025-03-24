import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/common/entities/user.entity";
import { IUser } from "src/common/interfaces/users.interface";
import { CreateUserDto, UpdateUserDto } from "src/common/dtos/user.dto";
import { isUUID } from "class-validator";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async getUsers(page: number, limit: number) {
        const skip = (page - 1) * limit;
        const take = Number(limit);

        const [users, total] = await this.userRepository.findAndCount({ skip, take });

        return {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            users
        };
    }

    async getUserById(id: string) {
        if (!isUUID(id)) {
            throw new NotFoundException(`ID no válido: ${id}`);
        }
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return user;
    }

    async createUser(userData: CreateUserDto) {
        const existinMail = await this.userRepository.findOne({
            where: { email: userData.email },
        });
        if (existinMail) {
            throw new BadRequestException(`Ese email ya está en uso`);
        }
        const newUser = this.userRepository.create(userData);
        return await this.userRepository.save(newUser);
    }

    async updateUser(id: string, userData: UpdateUserDto) {
        const existinMail = await this.userRepository.findOne({
            where: { email: userData.email },
        });
        if (existinMail) {
            throw new BadRequestException(`Ese email ya está en uso`);
        }
        const user = await this.getUserById(id);
        this.userRepository.merge(user, userData);
        return await this.userRepository.save(user);
    }

    async deleteUser(id: string) {
        if (!isUUID(id)) {
            throw new NotFoundException(`ID no válido: ${id}`);
        }
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return { message: `Usuario con ID ${id} eliminado exitosamente` };
    }
}
