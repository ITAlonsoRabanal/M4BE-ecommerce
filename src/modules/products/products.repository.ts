// import { BadRequestException, Injectable } from "@nestjs/common";
// import { plainToInstance } from "class-transformer";
// import { validate } from "class-validator";
// import { CreateProductDto } from "src/common/dtos/product.dto";
// import { IProduct } from "src/common/interfaces/product.interface";

// @Injectable()
// export class ProductsRepository {    

//     private products = [
//         { id: 1, name: "Smartphone Samsung Galaxy S23", description: "Pantalla AMOLED de 6.1 pulgadas, 256GB de almacenamiento y cámara de 50MP.", price: 799.99, stock: true, imgUrl: "https://example.com/images/samsung-s23.jpg" },
//         { id: 2, name: "Laptop Apple MacBook Air M2", description: "Chip M2, 8GB RAM, 256GB SSD y pantalla Retina de 13.6 pulgadas.", price: 1199.99, stock: true, imgUrl: "https://example.com/images/macbook-air-m2.jpg" },
//         { id: 3, name: "Auriculares Inalámbricos Sony WH-1000XM5", description: "Cancelación de ruido, batería de 30 horas y conectividad Bluetooth 5.2.", price: 399.99, stock: true, imgUrl: "https://example.com/images/sony-wh1000xm5.jpg" },
//         { id: 4, name: "Monitor LG UltraGear 27''", description: "144Hz, 1ms de respuesta, resolución 2K y tecnología IPS.", price: 349.99, stock: false, imgUrl: "https://example.com/images/lg-ultragear.jpg" },
//         { id: 5, name: "Teclado Mecánico Logitech G PRO X", description: "Switches intercambiables, iluminación RGB y diseño compacto.", price: 149.99, stock: true, imgUrl: "https://example.com/images/logitech-gpro-x.jpg" }
//     ]
    

//     async getProducts(page: number, limit: number) {
//         const startIndex = (page - 1) * limit; 
//         const endIndex = startIndex + Number(limit); // el limit seria string sin el Number()

//         console.log(`limit ${limit}`);
//         console.log(`inicio ${startIndex}, fin ${endIndex}`);
        

//         const paginatedProducts = this.products.slice(startIndex, endIndex);

//         return paginatedProducts;
//     }

//     async getProductById(id: number) {
//         const product = this.products.find(product => product.id === id);
//         if (!product) return "Producto no encontrado"; 
//         return product;
//     }    
    
//     async createProduct(product: IProduct) {
//         const productInstance = plainToInstance(CreateProductDto, product);
//         const errors = await validate(productInstance);
        
//         if (errors.length > 0) {
//             throw new BadRequestException('Datos inválidos para el product.');
//         }
//         console.log(product);
        
//         this.products.push(product);
//         return `Producto creado con id ${product.id}`;
//     }

//     async updateProduct(updatedProduct: IProduct, id: number) {
//         const productInstance = plainToInstance(CreateProductDto, updatedProduct);
//         const errors = await validate(productInstance);

//         if (errors.length > 0) {
//             throw new BadRequestException('Datos inválidos para el product.');
//         }

//         let didUpdate = false;
//         this.products = this.products.map(product => {
//             if (product.id === id) {
//                 didUpdate = true;
//                 return { ...product, ...updatedProduct };  
//             }
//             return product;
//         });
    
//         if (didUpdate) {
//             return `Producto con id ${id} actualizado`;
//         }
//         return `Producto con id ${id} no encontrado`;
//     }

// }