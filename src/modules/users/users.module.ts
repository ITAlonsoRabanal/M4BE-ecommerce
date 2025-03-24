import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/common/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository],
    exports: [UsersService]
})

export class UsersModule {}