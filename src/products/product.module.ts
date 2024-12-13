import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { UserModule } from '../user/user.module';

@Module({
    imports: [UserModule],
    controllers: [ProductController],
    providers: [ProductRepository],
})
export class ProductModule {}
