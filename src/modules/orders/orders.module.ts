import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "src/common/entities/orders.entity";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { UsersService } from "../users/users.service";
import { ProductsService } from "../products/products.service";
import { User } from "src/common/entities/user.entity";
import { Product } from "src/common/entities/products.entity";
import { OrderDetail } from "src/common/entities/orderDetails.entity";
import { CategoriesService } from "../categories/categories.service";
import { Category } from "src/common/entities/categories.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Order, User, Product, OrderDetail, Category])
    ],
    controllers: [OrdersController],
    providers: [OrdersService, UsersService, ProductsService, CategoriesService] 
})

export class OrdersModule {}     