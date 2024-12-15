import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { UniqueEmail } from '../validations/UniqueEmail.validator';

export class UpdateUserDTO {
    @IsString()
    @IsNotEmpty({ message: 'O Nome não pode ser vazio' })
    @IsOptional()
    name: string;

    @IsEmail(undefined, { message: 'O email deve ser um email válido' })
    @UniqueEmail({ message: 'Este email já está em uso' })
    @IsOptional()
    email: string;

    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    @IsOptional()
    password: string;
}
