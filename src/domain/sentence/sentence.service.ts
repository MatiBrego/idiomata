import { SentenceInputDto } from "./sentence.dto";
import { SentenceRepository } from "./sentence.repository";

export class SentenceService{
    constructor(private readonly sentenceRepository: SentenceRepository){}

    async createSentence(input: SentenceInputDto){
        return await this.sentenceRepository.createSentence(input);
    }

    async getSentencesByLanguage(language: string){
        return await this.sentenceRepository.getSentences(language)
    }
}