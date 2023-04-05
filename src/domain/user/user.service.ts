import { UserDto, UserInputDto } from "./user.dto";
import { UserRepository } from "./user.repository";

export class UserService{
    constructor(private readonly repository: UserRepository){}

    async createUser(user: UserInputDto): Promise<UserDto>{
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

    async getUserById(userId: number): Promise<UserDto | null>{
        return await this.repository.getUserById(userId);
    }

    async getUserByEmail(userEmail: string): Promise<UserDto | null>{
        return await this.repository.getUserByEmail(userEmail);
    }

    /**
     * Returns a user only if they are admin, otherwise it returns null
     * 
     * @param userEmail 
     * @returns {UserDto} UserDto if found, null if not found or not admin
     */
    async getAdminByEmail(userEmail: string): Promise<UserDto | null>{
        return await this.repository.getUserByEmailIfAdmin(userEmail);
    }
}