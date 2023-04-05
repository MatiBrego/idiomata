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

    async delete(userId: number): Promise<void>{
        await this.db.user.delete({
            where: {
                id: userId
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
}