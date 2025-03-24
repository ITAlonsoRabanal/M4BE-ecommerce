import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepository } from '../users/user.repository';

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [AuthService, UsersRepository],
})

export class AuthModule {}