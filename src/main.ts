import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true, // ignore json properties not present in the DTO
            forbidNonWhitelisted: true, // throw an error if a non-whitelisted property is present in the DTO,
            // exceptionFactory: (errors: ValidationError[]) => {
            //     console.log(errors);
            //     // For non-whitelisted fields, Nest will produce a validation error
            //     // where `err.property` is the disallowed property name
            //     const messages = errors.map((err) => {
            //         if (err.constraints?.whitelistValidation === `property ${err.property} should not exist`) {
            //             return `O campo ${err.property} não é permitido`;
            //         } else {
            //             return Object.values(err.constraints)[0];
            //         }
            //     });

            //     return new BadRequestException(messages);
            // },
        }),
    );

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    await app.listen(3000);
}
bootstrap();
