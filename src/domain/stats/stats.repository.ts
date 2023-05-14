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
                    word: {connect: {inEnglish: wordAttempt.word}},
                    language: {connect: {name: wordAttempt.language}}
                }
            })
        }else{
            attempt = await this.db.wordAttempt.create({
                data: {
                    user: {connect: {id: wordAttempt.userId}},
                    correct: wordAttempt.correct,
                    word: {connect: {inEnglish: wordAttempt.word}},
                    language: {connect: {name: wordAttempt.language}}
                }
            })
        }

        return new WordAttemptDto(attempt)
    }

    async getAllAttemptsByUser(userId: number, searchInput: WordAttemptSearchInputDto){
        const attempt = await this.db.wordAttempt.findMany({
            where: {
                userId: userId,
                language: {name: searchInput.language},
                word: {category: {name: searchInput.category}}
            },
            select: {
                id: true,
                correct: true,
                word: {select: {inEnglish: true}}
            }
        })

        return attempt
    }

    async getAttemptsByWord(userId: number, searchInput: WordAttemptSearchInputDto){
        const attempts = await this.db.word.findMany({
            where: {
                wordAttempts: {
                    some: {
                        AND:{
                            userId: userId,
                            correct: false,
                            language: {name: searchInput.language}
                        }
                    }
                },
                category: {name: searchInput.category}
            },
            select: {
                inEnglish: true,
                wordAttempts: {where: {correct: false, language: {name: searchInput.language}, userId: userId}, select: {id: true}}
            }
        })

        return attempts
    }
}