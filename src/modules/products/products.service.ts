import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "src/common/entities/products.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoriesService } from "../categories/categories.service";
import ProductsSeed from "../../common/helpers/ProductSeed"
import { plainToInstance } from "class-transformer";
import { isUUID, validate } from "class-validator";
import { CreateProductDto, UpdateProductDto } from "src/common/dtos/product.dto";


@Injectable()
export class ProductsService {
    
    
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @Inject()
        private readonly categoriesService: CategoriesService,
    ) {}

    async getProducts(page?: number, limit?: number) {
        if(!limit || !page) {
            const products = await this.productRepository.find({
                relations: ['category', 'orderDetails'],
            });     // El metodo findAndCount omite relaciones. Busco y cuento por separado
            const total = await this.productRepository.count(); 
            return { 
                total,
                page: 1,
                limit: null,
                totalPages: 1,
                products
            }
        }
        const skip = (page - 1) * limit; 
        const take = Number(limit); 
    
        const products = await this.productRepository.find({
            skip,
            take,
            relations: ['category', 'orderDetails'],
        }); 
        const total = await this.productRepository.count(); 
    
        return { 
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit),  
            products
        };
    }
    
    
    async getProductById(id: string) {
        const product = await this.productRepository.findOne({ 
            where: { id },
            relations: ['category', 'orderDetails'],
        });

        if (!product) {
            throw new BadRequestException(`Producto con ID ${id} no encontrado`);
        }

        return product;
    }

    async createProduct(product: CreateProductDto) {
        const categories = await this.categoriesService.getCategories(); 
        const productInstance = plainToInstance(CreateProductDto, product);
        const errors = await validate(productInstance);

        console.log(errors);
        

        if (errors.length > 0) {
            throw new BadRequestException('Datos inválidos para el producto.');
        }

        let productDB = {}

        const category = categories.find((category) => category.name === product.category);
            if (category) {
                productDB = {...productInstance, category: category}
            } else throw new BadRequestException('La categoría no existe');
            
        const newProduct = this.productRepository.create(productDB);
            console.log(newProduct);
        await this.productRepository.save(newProduct);

        return newProduct;
    }

    async updateProduct(id: string, updatedProduct: UpdateProductDto) {

        const product = await this.productRepository.findOne({ where: { id } });

        if (!product) {
            throw new BadRequestException(`Producto con ID ${id} no encontrado`);
        }

        const categories = await this.categoriesService.getCategories(); 

        let productDB = {}
        if(updatedProduct.category) {
            const category = categories.find((category) => category.name === updatedProduct.category);
            if (category) {
                productDB = {...updatedProduct, category: category}
            } else throw new BadRequestException('La categoría no existe');
        } else {
            productDB = {...updatedProduct, category: product.category}
        }
        await this.productRepository.save({
            ...product,
            ...productDB
        });
            // Hago la consulta otra vez para retornar todo el objeto
        return await this.productRepository.findOne({ where: { id }, relations: ['category']});;
    }
    
    async deleteProduct(id: string) {
        if (!isUUID(id)) {
            throw new NotFoundException(`ID no válido: ${id}`);
        }
        const result = await this.productRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Producto con ID ${id} no encontrado`);
        }
        return { message: `Producto con ID ${id} eliminado exitosamente` };
    }


    async productsSeeder() {
        const categories = await this.categoriesService.getCategories();  
        const anyProducts = await this.getProducts(1, 12)

        if (categories.length === 0) {
            console.log("No categories found, skipping product seeding...");
            return;
        }

        if(anyProducts.products.length > 0 ) {
            console.log(`Ya existen productos, se omite el product seeding`);
            return
        }

        const products = ProductsSeed.map((product) => {
            const productEntity = new Product();
            productEntity.name = product.name;
            productEntity.description = product.name; 
            productEntity.price = product.price;
            productEntity.stock = product.stock; 
            productEntity.imgUrl = 'https://via.placeholder.com/150'; 

            const category = categories.find((category) => category.name === product.category);
            if (category) {
                productEntity.category = category;
            }

            return productEntity;
        });

        await this.productRepository.save(products);
        console.log("Productos insertados correctamente");
    }
}
