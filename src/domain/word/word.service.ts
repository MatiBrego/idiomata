import { WordRepository } from "./word.repository";

export class WordService{
    constructor(private readonly repository: WordRepository){}

    getWords(request: WordRequestDto){
        this.repository.getWords(request)
    }
}