import { Injectable } from "@nestjs/common";
import { UploadApiResponse, v2 } from "cloudinary";
import * as toStream from 'buffer-to-stream'
import { Repository } from "typeorm";
import { ProductsService } from "../products/products.service";
import { UpdateProductDto } from "src/common/dtos/product.dto";

@Injectable()
export class FilesService {

    constructor(
        private readonly productService: ProductsService
    ) {}

    async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream(
                {resource_type: 'auto'},
                (error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error)
                    }
                }
                
            );
            toStream(file.buffer).pipe(upload)
        })
    }

    async updateProductUrl(id: string, imgUrl: UpdateProductDto) { 
        return this.productService.updateProduct(id, imgUrl)
    }
}