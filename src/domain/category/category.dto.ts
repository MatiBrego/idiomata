export class CategoryDto{
    id:number
    name:string

    constructor(category:CategoryDto){
        this.id = category.id;
        this.name = category.name;
    }
}


export class CategoryInputDto{
    name: string

    constructor(category: CategoryInputDto){
        this.name = category.name
    }
}