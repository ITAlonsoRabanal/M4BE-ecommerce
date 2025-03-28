import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { AuthGuard } from "../../common/guards/auth.guard";
import { AddCategoriesDto } from "src/common/dtos/categories.dto";

@Controller("categories")

export class CategoriesController {
    constructor(private readonly CategoriesService: CategoriesService) {}


    @Get()
    getCategories() {
        return this.CategoriesService.getCategories()
    }

    @Post()
    @UseGuards(AuthGuard)
    addCategories(@Body() categories: AddCategoriesDto[]) {
        return this.CategoriesService.addCategories(categories)
    }

    @Post("seeder")
    @UseGuards(AuthGuard)
    categoriesSeeder() {
        return this.CategoriesService.categoriesSeeder()
    }
    
}   