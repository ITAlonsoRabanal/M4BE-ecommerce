import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilesController } from "./file.controller";
import { FilesService } from "./file.service";
import { ProductsService } from "../products/products.service";
import { CloudinaryConfig } from "src/config/cloudinary.config";
import { CategoriesService } from "../categories/categories.service";
import { Product } from "src/common/entities/products.entity";
import { Category } from "src/common/entities/categories.entity";

@Module({
    imports: [ TypeOrmModule.forFeature([Product, Category])
    ],
    controllers: [FilesController],
    providers: [FilesService, ProductsService, CategoriesService, CloudinaryConfig] 
})

export class FilesModule {}     