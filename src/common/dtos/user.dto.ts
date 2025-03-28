import { IsString, IsNumber, IsOptional, Length, IsEmail, Matches, IsNotEmpty, IsBoolean } from 'class-validator';

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
    @IsBoolean()
    isAdmin: boolean;

    @IsOptional()
    @IsString()
    city?: string;
}

export class RegisterUserDto {

    @IsString()
    @Length(3, 80)
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @Length(8, 20) 
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/, {
        message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*).',
    })
    password: string;

    @IsString()
    @Length(8, 20) 
    confirmPassword: string;

    @IsNumber()
    @IsNotEmpty() 
    @IsOptional()
    phone: number;

    @IsString()
    @Length(5, 20)
    @IsOptional()
    country: string;

    @IsString()
    @Length(3, 80)
    @IsOptional()
    address: string;

    @IsOptional()
    isAdmin: boolean;

    @IsString()
    @Length(5, 20)
    @IsOptional()
    city: string;
}