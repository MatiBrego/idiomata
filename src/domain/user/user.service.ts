import { RequestRepository } from "../request/request.repository";
import { UserDto, UserInputDto } from "./user.dto";
import { UserRepository } from "./user.repository";

export class UserService{
    constructor(private readonly repository: UserRepository, private readonly requestRepository: RequestRepository){}

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

    async getAllFriends(userId: number): Promise<UserDto | null>{
        return await this.repository.getFriendsByUser(userId);
    }

    async deleteFriend(userId: number, friendId: number): Promise<void>{
        await this.repository.deleteFriend(userId, friendId);
    }

    async sendFriendRequest(userId: number, friendId: number){
        await this.requestRepository.createFriendRequest(userId, friendId);
    }

    async rejectFriendRequest(userId: number, friendId: number){
        await this.requestRepository.deleteFriendRequest(userId, friendId);
    }

    async getFriendRequests(userId: number){
        return await this.repository.getFriendRequests(userId);
    }
}