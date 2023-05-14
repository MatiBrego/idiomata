import { PrismaClient, SentencePart } from "@prisma/client";
import { SentenceDto, SentenceInputDto, SentenceRequesterDto } from "./sentence.dto";


export class SentenceRepository{
    constructor(private readonly db: PrismaClient){}

//TODO blanks must return translations too
    async createSentence(sentence: SentenceInputDto): Promise<SentenceDto>{
        var parts: {position: number, content: string}[] = []
        for (let i = 0; i < sentence.parts.length; i++) {
            const partContent = sentence.parts[i];
            parts.push({position: i, content: partContent})
        }
        var blanks: {position: number, word: {connect: {inEnglish: string}}}[] = []
        for (let i = 0; i < sentence.wordsInEnglish.length; i++) {
            const blankWord = sentence.wordsInEnglish[i];
            blanks.push({position: i, word: {connect: {inEnglish: blankWord}}})
        }
        const result = await this.db.sentence.create({
            data:{
                language: {connect: {name: sentence.language}},
                difficulty: sentence.difficulty,
                parts: {create: parts},
                blanks: {create: blanks}
            },
            select: {
                id: true,
                language: {select: {name: true}},
                difficulty: true,
                parts: true,
                blanks: {select: {word: {select: {inEnglish: true}}}}
            }
        })
        return new SentenceDto({id: result.id, language: result.language.name, difficulty: result.difficulty, blanks: result.blanks.map((blank) => {return blank.word.inEnglish}), parts: result.parts.map((part) => {return part.content})})
    }

    async deleteSentenceById(sentenceId: number): Promise<void>{
        await this.db.sentence.delete({
            where: {
                id: sentenceId
            }
        })
    }

    async getSentences(searchLanguage: string): Promise<{blanks: {word: {inEnglish: string}}[], parts: SentencePart[], id: number}[]>{
        const result = await this.db.sentence.findMany({
            where: {
                language: {name: searchLanguage}
            },
            select: {
                id: true,
                parts: true,
                blanks: {select: {word: {select: {inEnglish: true}}}}
            }
        })
        return result
    }
}