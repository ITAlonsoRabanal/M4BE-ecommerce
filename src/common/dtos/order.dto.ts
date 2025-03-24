import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class addOrderDto {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    userId: string;

    @IsArray()
    @ArrayNotEmpty()
    products: Product[]
    
}

class Product {
    @IsUUID()
    id: string
}