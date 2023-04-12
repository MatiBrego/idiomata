import { WordRepository } from "./word.repository";

export class WordService{
    constructor(private readonly repository: WordRepository){}

    async getWords(request: WordRequestDto): Promise<WordDto[]>{
        return await this.repository.getWords(request)
    }
}