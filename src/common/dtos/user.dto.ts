import { IsString, IsNumber, IsOptional, Length, IsEmail, Matches, IsNotEmpty } from 'class-validator';

export class CreateUserDto {

    @IsString()
    @Length(3, 80)
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @Length(8, 15) // 👈 Mínimo 8, máximo 15 caracteres
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/, {
        message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*).',
    })
    password: string;

    @IsNumber()
    @IsNotEmpty() 
    phone: number;

    @IsString()
    @Length(5, 20)
    country: string;

    @IsString()
    @Length(3, 80)
    address: string;

    @IsString()
    @Length(5, 20)
    city: string;
}

export class UpdateUserDto {

    @IsOptional() 
    @IsString()
    @Length(3, 80)
    name: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsNumber() 
    phone?: number;

    @IsOptional()
    @IsString()
    country?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    city?: string;
}
