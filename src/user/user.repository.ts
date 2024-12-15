import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
    private users: UserEntity[] = [];

    async save(user: UserEntity) {
        this.users.push(user);
    }

    async findAll() {
        return this.users;
    }

    async findUserByEmail(email: string) {
        return this.users.find((user) => user.email === email);
    }

    private searchById(id: string) {
        const user = this.users.find((user) => user.id === id);
        if (!user) throw new Error('User not found');
        return user;
    }

    async update(id: string, userData: Partial<UserEntity>) {
        const user = this.searchById(id);

        Object.entries(userData).forEach(([key, value]) => {
            user[key] = value;
        });

        return user;
    }

    async delete(id: string) {
        const user = this.searchById(id);

        this.users = this.users.filter((user) => user.id !== id);

        return user;
    }
}
