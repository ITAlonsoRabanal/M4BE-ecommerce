import { IsEmail, IsString, Length, Matches } from "class-validator";

export class LoginUserDto {
    
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
}