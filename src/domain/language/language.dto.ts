

export class LanguageDto{
    id:number
    name:string
    
    constructor(language:LanguageDto){
        this.id = language.id;
        this.name = language.name;
    }
}


//This one is the one we get from the http
export class LanguageInputDto{
    name:string

    constructor(language:LanguageInputDto){
        this.name = language.name;
    }
}