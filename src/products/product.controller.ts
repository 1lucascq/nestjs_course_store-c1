import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProductRepository } from "./product.repository";

type Product = {
    name: string;
    value: number;
    quantity: number;
    description: string;
    features: Array<{ name: string, description: string }>;
    images: Array<{ url: string, description: string }>;
    category: string;
    creationDate: string;
    updatedAt: string;
}

@Controller('/products')
export class ProductController {

    constructor(private productRepository: ProductRepository) { }

    @Post()
    async createUser(@Body() productData: Product) {
        await this.productRepository.save(productData);

        return { message: 'Product created', productData };
    }

    @Get()
    async getProducts() {
        return this.productRepository.findAll();
    }
}