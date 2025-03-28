import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeormConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesService } from './modules/categories/categories.service';
import { ProductsService } from './modules/products/products.service';
import { CategoriesController } from './modules/categories/categories.controller';
import { ProductsController } from './modules/products/products.controller';
import { Category } from './common/entities/categories.entity';
import { Product } from './common/entities/products.entity';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrdersModule } from './modules/orders/orders.module';
import { FilesModule } from './modules/file-upload/file.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [typeormConfig]
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule], // Asegura que ConfigModule esté cargado
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                const typeormOptions = config.get('typeorm');
                if (!typeormOptions) {
                    throw new Error('TypeORM configuration is missing!');
                }
                return typeormOptions;
            },
        }),
        TypeOrmModule.forFeature([Category]),
        UsersModule, 
        ProductsModule, 
        CategoriesModule,
        OrdersModule,
        AuthModule,
        FilesModule,
        JwtModule.register({
            global: true,
            signOptions: {expiresIn: '1h'},
            secret: process.env.JWT_SECRET
        })
    ],
    controllers: [],
    providers: [],
})
export class AppModule {

    constructor(
        private readonly categoriesService: CategoriesService,
        private readonly productsService: ProductsService,
    ) {}

    async onModuleInit() {
        // Primero se ejecuta el seeder de categorías
        await this.categoriesService.categoriesSeeder();

        await this.productsService.productsSeeder();    //pruebas
    }
}