import { Difficulty, PrismaClient } from "@prisma/client";
import { TranslationDto, TranslationInputDto, WordDto, WordInputDto, WordRequestDto, WordWithTranslationsDto } from "./word.dto";

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
                category: {is: {name: request.category}}
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
            translations: word.translations.map((translation) => {return translation.translated})
        })})
    }
}