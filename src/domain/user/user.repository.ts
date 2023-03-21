import { UserDto } from "./user.dto";
import { PrismaClient } from "@prisma/client";

export class UserRepository {

    constructor(private readonly db: PrismaClient){}

    async create(user: UserDto): Promise<UserDto>{
        const userResult = await this.db.user.create({
            data: user
        }
        )
        return userResult
    }

    async delete(userId: number): Promise<void>{
        await this.db.user.delete({
            where: {
                id: userId
            }
        })
    }
}