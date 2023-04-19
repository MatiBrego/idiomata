import { PrismaClient } from "@prisma/client";
import { WordAttemptDto, WordAttemptInputDto, WordAttemptSearchInputDto } from "./stats.dto";

export class StatsRepository{
    constructor(private readonly db: PrismaClient){}

    async createWordAttempt(wordAttempt: WordAttemptInputDto): Promise<WordAttemptDto>{
        let attempt;
        if(wordAttempt.translationId){
            attempt = await this.db.wordAttempt.create({
                data: {
                    translation: {connect: {id: wordAttempt.translationId}},
                    user: {connect: {id: wordAttempt.userId}},
                    correct: wordAttempt.correct,
                    word: {connect: {inEnglish: wordAttempt.word}}
                }
            })
        }else{
            attempt = await this.db.wordAttempt.create({
                data: {
                    user: {connect: {id: wordAttempt.userId}},
                    correct: wordAttempt.correct,
                    word: {connect: {inEnglish: wordAttempt.word}}
                }
            })
        }

        return new WordAttemptDto(attempt)
    }

    async getAllAttemptsByUser(userId: number, searchInput: WordAttemptSearchInputDto){
        const attempt = await this.db.wordAttempt.findMany({
            where: {
                userId: userId,
                translation: {
                    is: {
                        language: {
                            is: {
                                name: searchInput.language
                            }
                        },
                        difficulty: searchInput.difficulty,
                        word: {
                            is: {
                                category: {is: {name: searchInput.category}}
                            }
                        }
                    }
                }
            },
            select: {
                id: true,
                correct: true
            }
        })

        return attempt
    }
}