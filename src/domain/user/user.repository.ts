import { UserDto, UserInputDto } from "./user.dto";
import { PrismaClient } from "@prisma/client";

export class UserRepository {

    constructor(private readonly db: PrismaClient){}

    async create(user: UserInputDto): Promise<UserDto>{
        const userResult = await this.db.user.create({
            data: user
        })
        return userResult
    }

    async deleteByEmail(userEmail: string): Promise<void>{
        await this.db.user.delete({
            where:{
                email: userEmail
            }
        })
    }

    async changePassword(userId: number, newPassword: string): Promise<void>{
        await this.db.user.update({
            where: {
                id: userId
            },
            data:{
                password: newPassword
            }
        })
    }

    async changeEmail(userId: number, newEmail: string): Promise<void>{
        await this.db.user.update({
            where: {
                id: userId
            },
            data:{
                email: newEmail
            }
        })
    }

    async getUserById(userId:number): Promise<UserDto | null> {
        const userResult = await this.db.user.findUnique({
            where:{
                id: userId
            }
        })
        if(userResult){
            return new UserDto(userResult);
        }
        else{
            return null;
        }
    }

    async getUserByEmail(userEmail:string): Promise<UserDto | null> {
        const userResult = await this.db.user.findUnique({
            where:{
                email: userEmail
            }
        })
        if(userResult){
            return new UserDto(userResult);
        }
        else{
            return null;
        }
    }

    async getUserByEmailIfAdmin(userEmail:string): Promise<UserDto | null> {
        const userResult = await this.db.user.findFirst({
            where:{
                AND: {email: userEmail, isAdmin: true}
            }
        })
        if(userResult){
            return new UserDto(userResult);
        }
        else{
            return null;
        }
    }

    async addFriend(userId: number, friendId: number): Promise<void> {
        await this.db.user.update({
            where: {
                id: userId,
            },
            data: {
                friends: {
                    connect: {
                        id: friendId,
                    },
                },
            },
        })
        await this.db.user.update({
            where:{
                id: friendId,
            },
            data: {
                friends: {
                    connect: {
                        id: userId,
                    },
                },
            },
        })
    }

    async getFriendsByUser(userId: number): Promise<UserDto | null> {
        return await this.db.user.findUnique({
            where: {id: userId},
            include: {
                friends: {select: {
                    id: true,
                    name: true,
                    email: true
                }}
            }
        })
    }

    async deleteFriend(userId: number, friendId: number): Promise<void> {
        await this.db.user.update({
            where: {id: userId},
            data: {
                friends: {
                    disconnect: {id: friendId}
                }
            }
        })

        await this.db.user.update({
            where: {id: friendId},
            data: {
                friends: {
                    disconnect: {id: userId}
                }
            }
        })
    }

    async getFriendRequests(userId: number){
        const requests = await this.db.user.findUnique({
            where: {id: userId},
            include: {
                requestsReceived: {
                    select: {requester: {select: {id: true, name: true, email: true}}}
                }
            }
        })

        return requests
    }
}