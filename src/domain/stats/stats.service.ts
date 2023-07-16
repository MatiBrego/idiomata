import internal from "stream";
import { MemotestAttemptDto, WordAttemptDto, WordAttemptInputDto, WordAttemptSearchInputDto } from "./stats.dto";
import { StatsRepository } from "./stats.repository";

export class StatsService{
    constructor(private readonly repository: StatsRepository){}

    async createWordAttempt(wordAttempt: WordAttemptInputDto): Promise<WordAttemptDto>{
        return await this.repository.createWordAttempt(wordAttempt)
    }

    async getWordAttemptsByUserId(userId:number, searchInput: WordAttemptSearchInputDto){
        return await this.repository.getAllAttemptsByUser(userId, searchInput);
    }

    async getAttemptsByWord(userId: number, searchInput: WordAttemptSearchInputDto){
        const words = await this.repository.getAttemptsByWord(userId, searchInput)
        //Declare new result array
        const result: {word: string, errors:number}[] = [] 

        //Add word and error number to result for each word
        words.forEach(word => {
            result.push({word: word.inEnglish, errors: word.wordAttempts.length})
        });

        //Sort by errors, descending order
        result.sort((a, b) => {
            if(a.errors < b.errors) return 1
            if(a.errors > b.errors) return -1
            return 0
        })
        return result
    }

    async createMemotestAttempt(userId: number,timeInSeconds: number): Promise<void> {
        const prevTime = await this.repository.getMemotestAttemptByUserId(userId) 
        if(prevTime){
            if(timeInSeconds < prevTime.bestTime){
                await this.repository.updateMemotestAttempt(userId, timeInSeconds)
            }
        }else{
            await this.repository.createMemotestAttempt(userId, timeInSeconds)
        }
    }

    async getMemotestAttemptByUserId(userId: number): Promise<{bestTime: number} | null>{
        return await this.repository.getMemotestAttemptByUserId(userId)
    }
}