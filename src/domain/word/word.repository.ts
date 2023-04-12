import { PrismaClient } from "@prisma/client";

export class WordRepository{
    constructor(private readonly db:PrismaClient){}

    async getWords(request: WordRequestDto): Promise<WordDto[]>{
        return await [];
    }
}