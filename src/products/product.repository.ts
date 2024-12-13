import { Injectable } from "@nestjs/common";

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

@Injectable()
export class ProductRepository {
    private products: Product[] = [];

    async save(product: Product) {
        this.products.push(product)
    }

    async findAll() {
        return this.products;
    }
}
