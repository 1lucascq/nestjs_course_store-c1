import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDTO } from "./dto/CreateUser.dto";

@Controller('/users')
export class UserController {

    constructor(private userRepository: UserRepository) { }

    @Post()
    async createUser(@Body() userData: CreateUserDTO) {
        await this.userRepository.save(userData);

        return { message: 'User created', userData };
    }

    @Get()
    async getUsers() {
        return this.userRepository.findAll();
    }
}