import { PrismaClient } from "@prisma/client";

export class WordRepository{
    constructor(private readonly db:PrismaClient){}

    getWords(request: WordRequestDto){
    }
}