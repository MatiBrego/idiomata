import { PrismaClient } from "@prisma/client";


export class SentenceRepository{
    constructor(private readonly db: PrismaClient){}
}