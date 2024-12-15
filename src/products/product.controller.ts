import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDTO } from './dto/CreateProduct.dto';

@Controller('/products')
export class ProductController {
    constructor(private productRepository: ProductRepository) {}

    @Post()
    async createUser(@Body() productData: CreateProductDTO) {
        await this.productRepository.save(productData);

        return { message: 'Product created', productData };
    }

    @Get()
    async getProducts() {
        return this.productRepository.findAll();
    }
}
