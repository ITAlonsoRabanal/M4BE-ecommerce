import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { CategoriesService } from '../categories/categories.service';
import { CategoriesModule } from '../categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/common/entities/products.entity';
import { Category } from 'src/common/entities/categories.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, Category]),
    ],
    controllers: [ProductsController],
    providers: [ProductsService, ProductsRepository, CategoriesService],
    exports: [ProductsService] // Exportar para que se use en app.module
})

export class ProductsModule {}