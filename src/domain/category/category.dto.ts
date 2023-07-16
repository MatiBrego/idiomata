export class CategoryDto{
    id:number
    name:string
    imgPath?: string

    constructor(category:CategoryDto){
        this.id = category.id;
        this.name = category.name;
        this.imgPath = category.imgPath
    }
}


export class CategoryInputDto{
    name: string
    imgPath?: string

    constructor(category: CategoryInputDto){
        this.name = category.name
        this.imgPath = category.imgPath
    }
}