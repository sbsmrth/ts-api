import { v4 as uuid } from 'uuid';
import { CrudController } from '../core/crud-controller.interface';
import { User } from '../models/user';

export class UsersController implements CrudController<User> {
    private data: User[] = []
    
    findAll(): User[] {
        return this.data;
    }

    findOne(id: string): User | null {
        const user = this.data.find(user => user.id === id);
        return user ? user : null;
    }

    create(item: User): User {
        this.data.push({
            id: uuid(),
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email
        });
        return item;
    }

    update(id: string, item: User): User | null {
        const userIndex = this.data.findIndex(user => user.id === id);
        if (userIndex != -1) {
            this.data[userIndex] = item;
            return item;
        }
        return null;
    }

    delete(id: string): User | null {
        const userIndex = this.data.findIndex(user => user.id === id);
        if (userIndex != -1) {
            const deletedUser = this.data.splice(userIndex, 1)[0];
            return deletedUser;
        }
        return null;
    }
}
