import { UserDto, UserInputDto } from "./user.dto";
import { UserRepository } from "./user.repository";

export class UserService{
    constructor(private readonly repository: UserRepository){}

    async createUser(user: UserInputDto): Promise<UserDto>{
        return await this.repository.create(user);
    }

    async deleteUserByEmail(userEmail: string): Promise<void>{
        await this.repository.deleteByEmail(userEmail);
    }

    async changeUsersPassword(userId: number, newPassword: string): Promise<void>{
        await this.repository.changePassword(userId, newPassword);
    }

    async changeUsersEmail(userId: number, newEmail: string): Promise<void>{
        await this.repository.changeEmail(userId, newEmail);
    }

    async getUserById(userId: number): Promise<UserDto | null>{
        return await this.repository.getUserById(userId);
    }

    async getUserByEmail(userEmail: string): Promise<UserDto | null>{
        return await this.repository.getUserByEmail(userEmail);
    }

    async addFriend(userId: number, friendId: number): Promise<void>{
        await this.repository.addFriend(userId, friendId);
    }
}