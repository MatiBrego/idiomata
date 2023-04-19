import { WordRepository } from "./word.repository";
import { WordRequestDto, WordDto, WordInputDto, TranslationInputDto, TranslationDto, WordWithTranslationsDto } from "./word.dto";

export class WordService{
    constructor(private readonly repository: WordRepository){}

    async createWord(word: WordInputDto): Promise<WordDto>{
        return await this.repository.createWord(word)
    }

    async addTranslation(translation: TranslationInputDto): Promise<TranslationDto>{
        return await this.repository.createTranslation(translation)
    }

    async getWords(translation: WordRequestDto): Promise<WordWithTranslationsDto[]>{
        return await this.repository.getWords(translation);
    }

    async getWordByName(wordInEnglish: string){
        return await this.repository.getWordByName(wordInEnglish);
    }

    async deleteWord(wordInEnglish: string){
        await this.repository.deleteWord(wordInEnglish);
    }

    async deleteTranslation(translationId: number){
        await this.repository.deleteTranslation(translationId);
    }
}