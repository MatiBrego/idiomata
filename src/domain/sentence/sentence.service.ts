import { SentenceDto, SentenceInputDto } from "./sentence.dto";
import { SentenceRepository } from "./sentence.repository";

export class SentenceService{
    constructor(private readonly sentenceRepository: SentenceRepository){}

    async createSentence(input: SentenceInputDto){
        return await this.sentenceRepository.createSentence(input);
    }

    async getSentencesByLanguage(language: string){
        return await this.sentenceRepository.getSentences(language)
    }

    async deleteSentenceById(id: number){
        return await this.sentenceRepository.deleteSentenceById(id)
    }

    async updateSentence(sentence: SentenceDto){
        await this.sentenceRepository.deleteSentenceById(sentence.id);
        console.log(sentence)
        return await this.sentenceRepository.createSentence({language: sentence.language, parts: sentence.parts, wordsInEnglish: sentence.blanks,difficulty: sentence.difficulty})
    }
}