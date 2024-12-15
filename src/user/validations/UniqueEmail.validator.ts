import { ValidationOptions } from './../../../node_modules/class-validator/types/decorator/ValidationOptions.d';
import { ValidationArguments } from './../../../node_modules/class-validator/types/validation/ValidationArguments.d';
import { registerDecorator, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UserRepository } from '../user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {
    constructor(private userRepository: UserRepository) {}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const userExists = await this.userRepository.findUserByEmail(value);
        return !userExists;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'Este email já está em uso';
    }
}

export const UniqueEmail = (validationOptions: ValidationOptions) => {
    return (object: Object, property: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: property,
            options: validationOptions,
            constraints: [],
            validator: UniqueEmailValidator,
        });
    };
};
