import { PrismaClient } from "@prisma/client";

export class RequestRepository{
    constructor(private readonly db: PrismaClient){}

    async createFriendRequest(userId: number, friendId: number){
        return await this.db.friendRequest.create({
            data: {
                requesterId: userId,
                requestedId: friendId
            }
        })
    }

    async deleteFriendRequest(userId: number, friendId: number){
        await this.db.friendRequest.deleteMany({
            where: {
                requesterId: friendId,
                requestedId: userId
            }
        })
    }
}