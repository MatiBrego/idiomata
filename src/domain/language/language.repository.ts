import {PrismaClient} from "@prisma/client"
import { LanguageInputDto, LanguageDto } from "./language.dto"


export class LanguageRepository{
    
    constructor(private readonly db:PrismaClient){}

    async create(language: LanguageInputDto): Promise<LanguageDto>{
        const languageResult = await this.db.language.create({
            data:language
        })
        return languageResult;
    }


    async delete(languageName: string): Promise<void>{
        await this.db.language.delete({
            where:{
                name:languageName
            }
        })
    
    }

    async modify(languageName: string, newLanguageName:string): Promise<void>{
        await this.db.language.update({
            where:{
            name:languageName
            },
            data:{
                name:newLanguageName
            }
        })
    }

    async getAll():Promise<String[]>{
        const response = await this.db.language.findMany({});
        return response.map((json)=>{return json.name});
    }


    async getByName(name: string): Promise<LanguageDto | null>{
        const language = await this.db.language.findUnique({
            where: {name: name}
        })

        return language? new LanguageDto(language): null
    }
}