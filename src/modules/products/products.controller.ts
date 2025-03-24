import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { IProduct } from "src/common/interfaces/product.interface";
import { AuthGuard } from "../auth/auth.guard";
import { CreateProductDto } from "src/common/dtos/product.dto";

@Controller("products")

export class ProductsController {
    constructor(private readonly ProductsService: ProductsService) {}

    @Get()
    @HttpCode(200)
    getProducts(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 0,
    ) {
        return this.ProductsService.getProducts(page, limit);
    }

    @Get(":id")
    getProductById(@Param("id", ParseUUIDPipe) id: string) {        
        return this.ProductsService.getProductById(id)
    }

    @Post()
    @UseGuards(AuthGuard)
    createProduct(@Body() product: CreateProductDto) {
        return this.ProductsService.createProduct(product)
    }

    @Put(":id")
    @UseGuards(AuthGuard)
    updateProduct(@Param("id", ParseUUIDPipe) id: string, @Body() product: CreateProductDto) {
        return this.ProductsService.updateProduct(id, product)
    } 

    @Delete(":id")
    @UseGuards(AuthGuard)
    deleteProduct(@Param("id", ParseUUIDPipe) id: string) {
        return this.ProductsService.deleteProduct(id)
    }
};