import { Difficulty, PrismaClient } from "@prisma/client";
import { TranslationDto, TranslationInputDto, WordDto, WordInputDto, WordRequestDto, WordWithTranslationsDto } from "./word.dto";
import { readSync } from "fs";
import { wordRouter } from "./word.controller";

export class WordRepository{
    constructor(private readonly db:PrismaClient){}

    async createWord(word: WordInputDto): Promise<WordDto>{
        const result = await this.db.word.create({
            data: {
                inEnglish: word.inEnglish,
                category: {
                    connect: {name: word.category}
                }
            }
            
        })

        return new WordDto(result)
    }

    async createTranslation(translation: TranslationInputDto): Promise<TranslationDto>{
        const result = await this.db.translation.create({
            data: {
                translated: translation.translated,
                difficulty: translation.difficulty,
                language: {connect: {name: translation.language}},
                word: {connect: {inEnglish: translation.word}}
            }
        })

        
        return new TranslationDto(result)
    }

    async getWords(request: WordRequestDto): Promise<WordWithTranslationsDto[]>{
        const result = await this.db.word.findMany({
            where: {
                AND:[
                    {category: {is: {name: request.category}}},
                    {translations: {some: {language: {name: request.language}}}}
                ]
            },
            select: {
                id: true,
                inEnglish: true,
                categoryId: true,
                translations: {where: {language: {is: {name: request.language}}, difficulty: request.difficulty}}
            },
            take: request.limit
        })

        return result.map((word) => {return new WordWithTranslationsDto({
            id: word.id, 
            inEnglish: word.inEnglish, 
            categoryId: word.categoryId, 
            language: request.language, 
            translations: word.translations.map((translation) => {return {translated: translation.translated, id: translation.id}})
        })})
    }

    async getWordByName(wordInEnglish: string): Promise<{name: string, translations: {translated: string, id: number}[]}[]>{
        const results = await this.db.language.findMany({
            select:{
                name: true,
                translations: {
                    where: {word: {is: {inEnglish: wordInEnglish}}},
                    select: {translated: true, id: true}
                }
            }
        })

        return results
    }

    async deleteWord(wordInEnglish: string): Promise<void>{
        await this.db.word.delete({
            where: {
                inEnglish: wordInEnglish,
            }
        })
    }

    async deleteTranslation(translationId: number): Promise<void>{
        await this.db.translation.delete({
            where:{
                id: translationId,
            }
        })
    }
}