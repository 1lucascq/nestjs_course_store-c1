import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
    @IsString()
	@IsNotEmpty({ message: 'O Nome não pode ser vazio' })
    name: string;
    
	@IsEmail(undefined, { message: 'O email deve ser um email válido' })
	email: string;

	@MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    password: string;
}
