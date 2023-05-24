import { Difficulty, Game } from "@prisma/client"

export class WordAttemptInputDto{
    userId: number
    translationId: number
    correct: boolean
    word: string
    language: string
    game: Game

    constructor(attempt: WordAttemptInputDto){
        this.userId = attempt.userId
        this.translationId = attempt.translationId
        this.correct = attempt.correct
        this.word = attempt.word
        this.language = attempt.language
        this.game = attempt.game
    }
}

export class WordAttemptDto{
    userId: number
    translationId: number|null
    correct: boolean

    constructor(attempt: WordAttemptDto){
        this.userId = attempt.userId
        this.translationId = attempt.translationId
        this.correct = attempt.correct
    }    
}

export class WordAttemptSearchInputDto{
    language?: string
    category?: string
    difficulty?: Difficulty
    game?: Game 

    constructor(attempt: WordAttemptSearchInputDto){
        this.language = attempt.language
        this.difficulty = attempt.difficulty
        this.game = attempt.game
    }    
}