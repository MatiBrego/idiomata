import { UserDto } from "./user.dto";
import { UserRepository } from "./user.repository";

export class UserService{
    constructor(private readonly repository: UserRepository){}

    async createUser(user: UserDto): Promise<UserDto>{
        return await this.repository.create(user);
    }

    async deleteUser(userId: number): Promise<void>{
        await this.repository.delete(userId);
    }

    async changeUsersPassword(userId: number, newPassword: string): Promise<void>{
        await this.repository.changePassword(userId, newPassword);
    }

    async changeUsersEmail(userId: number, newEmail: string): Promise<void>{
        await this.repository.changeEmail(userId, newEmail);
    }
}