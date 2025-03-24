import { IsString, IsNumber, IsUrl } from "class-validator";

export class CreateProductDto {

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;

  @IsString()
  imgUrl: string;

  @IsString()
  category: string
}


