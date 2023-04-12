
class WordRequestDto{
    language: string
    category?: string
    difficulty?: string
    limit?: string

    constructor(request: WordRequestDto){
        this.language = request.language;
        this.category = request.category
        this.difficulty = request.difficulty
        this.limit = request.limit
    }
}

class WordDto{
    wordInEnglish: string
    language: string
    translations: string[]

    constructor(word: WordDto){
        this.wordInEnglish = word.wordInEnglish;
        this.language = word.language;
        this.translations = word.translations;
    }
}