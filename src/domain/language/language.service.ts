import { LanguageInputDto, LanguageDto } from "./language.dto"
import { LanguageRepository } from "./language.repository"

export class LanguageService{

    constructor(private readonly repository: LanguageRepository){}



    async createLanguage(language:LanguageInputDto):Promise<LanguageDto>{
        return await this.repository.create(language);
    }

    async deleteLanguage(language:string):Promise<void>{
        return await this.repository.delete(language);
    }

    async modifyLanguage(language:string, newLanguageName:string):Promise<void>{
        return await this.repository.modify(language, newLanguageName);
    }



}