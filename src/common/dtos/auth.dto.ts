import { IsEmail, IsString, Length, Matches } from "class-validator";

export class LoginUserDto {
    
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @Length(8, 15) // 👈 Mínimo 8, máximo 15 caracteres
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/, {
        message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*).',
    })
    password: string;
}