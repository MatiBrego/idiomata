
class WordRequestDto{
    language: String
    category?: String
    difficulty?: String
    limit?: String

    constructor(request: WordRequestDto){
        this.language = request.language;
        this.category = request.category
        this.difficulty = request.difficulty
        this.limit = request.limit
    }
}