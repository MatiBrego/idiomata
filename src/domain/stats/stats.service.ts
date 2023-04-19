import { WordAttemptDto, WordAttemptInputDto, WordAttemptSearchInputDto } from "./stats.dto";
import { StatsRepository } from "./stats.repository";

export class StatsService{
    constructor(private readonly repository: StatsRepository){}

    async createWordAttempt(wordAttempt: WordAttemptInputDto): Promise<WordAttemptDto>{
        return await this.repository.createWordAttempt(wordAttempt)
    }

    async getWordAttemptsByUserId(userId:number, searchInput: WordAttemptSearchInputDto){
        return await this.repository.getAllAttemptsByUser(userId, searchInput);
    }

    
}