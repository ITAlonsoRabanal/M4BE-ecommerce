import { IsString, IsNumber, IsUrl, IsOptional } from "class-validator";

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


export class UpdateProductDto {

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  stock?: number;

  @IsOptional()
  @IsString()
  @IsUrl()
  imgUrl?: string;

  @IsOptional()
  @IsString()
  category?: string
}