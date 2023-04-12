import { PrismaClient } from "@prisma/client";
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
}