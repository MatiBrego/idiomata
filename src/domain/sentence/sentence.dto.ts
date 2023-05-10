import { Difficulty } from "@prisma/client"

// SentenceBlanks is an array of arrays where index 0 is word in english and the following elements are the possible translations of the word.
export class SentenceDto{
    id: number
    languageId: number
    difficulty?: Difficulty
    sentenceParts: []
    sentenceBlanks: [[]]

    constructor(sentence: SentenceDto){
        this.id = sentence.id
        this.languageId = sentence.languageId
        this.difficulty = sentence.difficulty
        this.sentenceParts = sentence.sentenceParts
        this.sentenceBlanks = sentence.sentenceBlanks
    }
}

export class SentenceInputDto{
    languageId: number
    difficulty?: Difficulty
    sentenceParts: []
    wordsInEnglish: []

    constructor(sentenceInput: SentenceInputDto){
        this.languageId = sentenceInput.languageId
        this.difficulty = sentenceInput.difficulty
        this.sentenceParts = sentenceInput.sentenceParts
        this.wordsInEnglish = sentenceInput.wordsInEnglish
    }
}