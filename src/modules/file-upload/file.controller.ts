import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FilesService } from "./file.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { UpdateProductDto } from "src/common/dtos/product.dto";
import { ProductsService } from "../products/products.service";
import { AuthGuard } from "../../common/guards/auth.guard";

@Controller('files')

export class FilesController {
    constructor(private readonly fileService: FilesService,
        private readonly productService: ProductsService
    ) {}

    @Post('uploadImage/:id')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(
        @Param('id', ParseUUIDPipe) id: string,
        @UploadedFile(
            new ParseFilePipe({  
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 200000,
                        message: `El archivo debe pesar menos de 200KB`
                    }),
                    new FileTypeValidator({
                        fileType: /(jpg|jpeg|png|webp|)$/,
                    })
                ]
            })
        ) file: Express.Multer.File
    ) {
        const secure_url = (await this.fileService.uploadImage(file)).secure_url;
        return this.productService.updateProduct(id, {imgUrl: secure_url})
        
    }
}