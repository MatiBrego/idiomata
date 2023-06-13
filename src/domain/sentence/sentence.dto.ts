import { Difficulty } from "@prisma/client"

// SentenceBlanks is an array of arrays where index 0 is word in english and the following elements are the possible translations of the word.
export class SentenceDto{
    id: number
    language: string
    difficulty: Difficulty | null
    parts: string[]
    blanks: string[]

    constructor(sentence: SentenceDto){
        this.id = sentence.id
        this.language = sentence.language
        this.difficulty = sentence.difficulty
        this.parts = sentence.parts
        this.blanks = sentence.blanks
    }
}

export class SentenceInputDto{
    language: string
    difficulty: Difficulty | null
    parts: string[]
    wordsInEnglish: string[]

    constructor(sentenceInput: SentenceInputDto){
        this.language = sentenceInput.language
        this.difficulty = sentenceInput.difficulty
        this.parts = sentenceInput.parts
        this.wordsInEnglish = sentenceInput.wordsInEnglish
    }
}

export class SentenceRequesterDto{
    language: string
    difficulty?: Difficulty

    constructor(sentenceRequester: SentenceRequesterDto){
        this.language = sentenceRequester.language
        this.difficulty = sentenceRequester.difficulty
    }
}