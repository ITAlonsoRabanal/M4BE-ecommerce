import { IsString } from "class-validator";

export class AddCategoriesDto {
    
    @IsString()
    name: string;

}