import { Injectable } from "@nestjs/common";
import { Category } from "src/common/entities/categories.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AddCategoriesDto } from "src/common/dtos/categories.dto";

@Injectable()
export class CategoriesService {
    
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) {}

    async getCategories() {
        return this.categoryRepository.find();
    }

    async addCategories(categories: AddCategoriesDto[]) {
        const newCategories = this.categoryRepository.create(categories);
        await this.categoryRepository.save(newCategories);
        return categories;
    };
    
    
    async categoriesSeeder() {
        const categories = await this.getCategories();
        if (categories.length === 0) {
            const categoryNames = ["smartphone", "monitor", "keyboard", "mouse"];

            const newCategories = categoryNames.map((name) => {
                const category = new Category();
                category.name = name;
                return category;
            });

            await this.categoryRepository.save(newCategories);
            console.log("Categorías insertadas correctamente");
        } else {
            console.log("Ya existen categorías, se omite el categories seeding");
        }
    }
}
