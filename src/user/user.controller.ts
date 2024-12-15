import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UserEntity } from './user.entity';
import { GetUser } from './dto/GetUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';

@Controller('/users')
export class UserController {
    constructor(private userRepository: UserRepository) {}

    @Get()
    async getUsers() {
        const savedUsers = await this.userRepository.findAll();
        return savedUsers.map((user) => new GetUser(user.id, user.name, user.email));
    }

    @Post()
    async createUser(@Body() userData: CreateUserDTO) {
        const userEntity = new UserEntity(userData);

        await this.userRepository.save(userEntity);

        return { message: 'User created', user: new GetUser(userEntity.id, userEntity.name, userEntity.email) };
    }

    @Patch('/:id')
    async updateUser(@Param('id') id: string, @Body() userData: UpdateUserDTO) {
        const updatedUser = await this.userRepository.update(id, userData);
        return { message: 'User updated', user: new GetUser(updatedUser.id, updatedUser.name, updatedUser.email) };
    }

    @Delete('/:id')
    async removeUser(@Param('id') id: string) {
        const removedUser = await this.userRepository.delete(id);

        return {
            message: 'User deleted',
            user: removedUser
        };
    }
}
