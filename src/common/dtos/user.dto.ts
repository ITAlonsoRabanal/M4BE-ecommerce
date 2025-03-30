import { IsString, IsNumber, IsOptional, Length, IsEmail, Matches, IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateUserDto {

    /**
     * 3 to 80 characters name
     * @example Example Name
     */
    @IsOptional() 
    @IsString()
    @Length(3, 80)
    name: string;

    /**
     * email type string
     * @example example@gmail.com
     */
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
    isAdmin?: boolean;

    @IsOptional()
    @IsString()
    city?: string;
}

export class RegisterUserDto {

    @IsString()
    @Length(3, 80)
    name: string;

     /**
     * email type string
     * @example example@gmail.com
     */
    @IsString()
    @IsEmail()
    email: string;

    /**
     * 8 to 20 characters password containing one lowercase and one uppercase letter and any of (!@#$%^&*)
     * @example passwordU1*
     */
    @IsString()
    @Length(8, 20) 
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/, {
        message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*).',
    })
    password: string;
    /**
     * must match password
     * @example passwordU1*
     */
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

    /**
     * false for default, no need to include it in request body
     * @example false
     */
    @IsOptional()
    isAdmin: boolean;

    @IsString()
    @Length(5, 20)
    @IsOptional()
    city: string;
}