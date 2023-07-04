export class UserDto{
    id: number
    name: string
    email: string
    password: string
    languageId: number | null
    language?: string | null
    isAdmin?: boolean

    constructor(user: UserDto){
        this.id = user.id
        this.name = user.name
        this.email = user.email
        this.password = user.password
        this.languageId = user.languageId
        this.language = user.language
        this.isAdmin = user.isAdmin
    }
}

export class UserInputDto{
    name: string
    email: string
    password: string
    language: string

    constructor(user: UserInputDto){
        this.name = user.name
        this.email = user.email
        this.password = user.password
        this.language = user.language
    }
}