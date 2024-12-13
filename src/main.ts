import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
    BadRequestException,
    ValidationError,
    ValidationPipe,
} from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true, // ignore json properties not present in the DTO
            forbidNonWhitelisted: true, // throw an error if a non-whitelisted property is present in the DTO,
            exceptionFactory: (errors: ValidationError[]) => {
                // For non-whitelisted fields, Nest will produce a validation error
                // where `err.property` is the disallowed property name
                const messages = errors.map((err) => {
                    return `O campo ${err.property} não é permitido`;
                });

                return new BadRequestException(messages);
            },
        }),
    );
    await app.listen(3000);
}
bootstrap();
