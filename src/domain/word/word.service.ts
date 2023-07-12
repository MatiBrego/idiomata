import { WordRepository } from "./word.repository";
import { WordRequestDto, WordDto, WordInputDto, TranslationInputDto, TranslationDto, WordWithTranslationsDto } from "./word.dto";
import { CategoryRepository } from "../category/category.repository";
import { LanguageRepository } from "../language/language.repository";
import { Difficulty } from "@prisma/client";

export class WordService{
    constructor(
        private readonly repository: WordRepository, 
        private readonly categoryRepository: CategoryRepository, 
        private readonly languageRepository: LanguageRepository){}

    async createWord(word: WordInputDto): Promise<WordDto>{
        return await this.repository.createWord(word)
    }

    async addTranslation(translation: TranslationInputDto): Promise<TranslationDto>{
        return await this.repository.createTranslation(translation)
    }

    async uploadWordsFromList(wordList: string[][]): Promise<{lines: number, categoriesNotFound: String[], existingWords: String[]} | null>{
        // Verify csv headers
        const expectedFormat = ["word", "category"]
        if(wordList[0].toString().toLowerCase().trim()  !== expectedFormat.toString().toLowerCase().trim()) return null;

        const categories = await this.categoryRepository.getAll();

        let lines = 0
        const categoriesNotFound: Set<String> = new Set()
        const existingWords: Set<String> = new Set()

        for(let i = 1; i < wordList.length; i++){
            const word = [wordList[i][0].toLowerCase().trim(), wordList[i][1].toLowerCase().trim()]
            if(categories.lastIndexOf(word[1]) === -1){
                categoriesNotFound.add(word[1])

            }else if((await this.repository.getUniqueWord(word[0])) !== null){
                existingWords.add(word[0])

            }else{
                lines++
                await this.repository.createWord({category: word[1], inEnglish: word[0]})
            }
        }

        return {lines: lines, categoriesNotFound: Array.from(categoriesNotFound), existingWords: Array.from(existingWords)}
    }

    async uploadTranslationsFromList(wordList: string[][]): Promise<{lines: number, wordsNotFound: String[], translationWithInvalidLanguages: String[], translationsWithInvalidDifficulty: String[]} | null>{
        // Verify csv headers
        const expectedFormat = ["wordInEnglish", "translation", "language", "difficulty"]
        if(wordList[0].toString().toLowerCase().trim()  !== expectedFormat.toString().toLowerCase().trim()) return null;

        const languages = await this.languageRepository.getAll();
        const difficulties = new Map<String, Difficulty>();
        difficulties.set("EASY", Difficulty.EASY)
        difficulties.set("MID", Difficulty.MID)
        difficulties.set("HARD", Difficulty.HARD)

        let lines = 0
        const wordsNotFound: Set<String> = new Set()
        const translationWithInvalidLanguages: Set<String> = new Set()
        const translationsWithInvalidDifficulty: Set<String> = new Set()


        for(let i = 1; i < wordList.length; i++){
            const word = [wordList[i][0].toLowerCase().trim(), wordList[i][1].toLowerCase().trim(), wordList[i][2].toLowerCase().trim(), wordList[i][3].toUpperCase().trim()]
            
            if(languages.lastIndexOf(word[2]) === -1){
                translationWithInvalidLanguages.add(word[1])

            }else if(difficulties.get(word[3]) === undefined){
                translationsWithInvalidDifficulty.add(word[1])

            }else if((await this.repository.getUniqueWord(word[0])) === null){
                wordsNotFound.add(word[0])
            }else{
                lines++
                await this.repository.createTranslation({word: word[0], translated: word[1], language: word[2], difficulty: difficulties.get(word[3]) || Difficulty.EASY})
            }
        }
        return {lines: lines, wordsNotFound: Array.from(wordsNotFound), translationWithInvalidLanguages: Array.from(translationWithInvalidLanguages), translationsWithInvalidDifficulty: Array.from(translationsWithInvalidDifficulty)}
    }

    async getWords(translation: WordRequestDto): Promise<WordWithTranslationsDto[]>{
        return await this.repository.getWords(translation);
    }

    async getWordByName(wordInEnglish: string){
        return await this.repository.getWordByName(wordInEnglish);
    }

    async deleteWord(wordInEnglish: string){
        await this.repository.deleteWord(wordInEnglish);
    }

    async deleteTranslation(translationId: number){
        await this.repository.deleteTranslation(translationId);
    }

    async updateWord(oldWord: string, newWord: string){
        await this.repository.updateWord(oldWord, newWord);
    }
}