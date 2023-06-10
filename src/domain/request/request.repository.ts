import { PrismaClient } from "@prisma/client";

export class RequestRepository{
    constructor(private readonly db: PrismaClient){}

    async createFriendRequest(userId: number, friendEmail: string){
        return await this.db.friendRequest.create({
            data: {
                requester: {connect: {id: userId}},
                requested: {connect: {email: friendEmail}}
            }
        })
    }

    async deleteFriendRequest(userId: number, friendId: number){
        await this.db.friendRequest.deleteMany({
            where: {
                OR:[
                    {AND: [
                            {
                            requestedId: userId
                            },
                            {
                                requesterId: friendId
                            }
                        ]
                    },
                    {AND: [
                            {
                            requestedId: friendId
                            },
                            {
                            requesterId: userId
                            }
                        ]
                    }
                ]
            }
        })
    }
}