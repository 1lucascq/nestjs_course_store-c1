interface UserProps {
    name: string;
    email: string;
    password: string;
}
import { v4 as uuid } from 'uuid';
export class UserEntity {
    id: string;
    name: string;
    email: string;
    password: string;

    constructor({ name, email, password }: UserProps) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.id = uuid();
    }
}
