import { Difficulty } from "@prisma/client"

export class WordAttemptInputDto{
    userId: number
    translationId: number
    correct: boolean
    word: string

    constructor(attempt: WordAttemptInputDto){
        this.userId = attempt.userId
        this.translationId = attempt.translationId
        this.correct = attempt.correct
        this.word = attempt.word
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

    constructor(attempt: WordAttemptSearchInputDto){
        this.language = attempt.language
        this.difficulty = attempt.difficulty
    }    
}