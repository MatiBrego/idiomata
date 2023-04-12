import { Difficulty } from "@prisma/client";

// Dto for requesting a word. Can have category, difficulty and a word limit. Must have language
export class WordRequestDto{
    languageId: number
    categoryId?: number
    difficulty?: string
    limit?: number

    constructor(wordRequest: WordRequestDto){
        this.languageId = wordRequest.languageId;
        this.categoryId = wordRequest.categoryId
        this.difficulty = wordRequest.difficulty
        this.limit = wordRequest.limit
    }
}

// Dto for creating a word
export class WordInputDto{
    category: string
    inEnglish: string

    constructor(wordInput: WordInputDto){
        this.category = wordInput.category;
        this.inEnglish = wordInput.inEnglish
    }
}

export class WordDto{
    id: number
    inEnglish: string
    categoryId: number

    constructor(word: WordDto){
        this.id = word.id
        this.inEnglish = word.inEnglish;
        this.categoryId = word.categoryId
    }
}

// Dto for a word with its translations in a certain language
export class WordWithTranslationsDto extends WordDto{
    language: string
    translations: string[]

    constructor(word: WordWithTranslationsDto){
        super({id: word.id, inEnglish: word.inEnglish, categoryId: word.categoryId})
        this.language = word.language;
        this.translations = word.translations;
    }
}

export class TranslationInputDto{
    word: string
    translated: string
    difficulty: Difficulty
    language: string
    

    constructor(translation: TranslationInputDto){
        this.word = translation.word
        this.translated = translation.translated
        this.difficulty = translation.difficulty
        this.language = translation.language
    }
}

export class TranslationDto{
    id: number
    translated: string
    languageId: number
    difficulty: Difficulty

    constructor(translation: TranslationDto){
        this.id = translation.id
        this.translated = translation.translated
        this.languageId = translation.languageId
        this.difficulty = translation.difficulty
    }
}