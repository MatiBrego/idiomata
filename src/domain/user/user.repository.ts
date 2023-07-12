import { UserDto, UserInputDto } from "./user.dto";
import { PrismaClient } from "@prisma/client";

export class UserRepository {

    constructor(private readonly db: PrismaClient){}

    async create(user: UserInputDto): Promise<UserDto>{
        const userResult = await this.db.user.create({
            data: {name: user.name, language: {connect: {name: user.language}}, email: user.email, password: user.password}
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

    async getUserLanguage(userId: number): Promise<string | undefined>{
        const result = await this.db.user.findUnique({
                where: {id: userId},
                select: {language: {select: {name: true}}}
            })

        return result?.language?.name
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

    async changeLanguage(userId: number, newLanguage: string): Promise<void>{
        await this.db.user.update({
            where: {
                id: userId
            },
            data:{
                language: {connect: {name: newLanguage}}
            }
        })
    }

    async getUserById(userId:number): Promise<UserDto | null> {
        const userResult = await this.db.user.findUnique({
            where:{
                id: userId
            },
            include: {language: {select: {name:true}}}
        })
        if(userResult){
            return new UserDto({id: userResult.id, name: userResult.name, email: userResult.email, password: userResult.password, languageId: userResult.languageId, language: userResult.language?.name, isAdmin: userResult.isAdmin});
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
                friends: {
                    select: {
                    id: true,
                    name: true,
                    email: true,
                    wordAttempts: true
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

    async searchIfAlreadyFriends(userId: number, friendId: number): Promise<boolean>{
        const friends = await this.db.user.findUnique({
            where: {id: userId},
            include:{
                friends:{
                    select:{id: true}
                }
            }
        })
        if(friends?.friends.some((friend) => friend.id === friendId)){
            return true;
        }
        else{
            return false;
        }
    }
}