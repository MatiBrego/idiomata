export class UserDto{
    name: string
    email: string
    password: string
    language: string

    constructor(user: UserDto){
        this.name = user.name
        this.email = user.email
        this.password = user.password
        this.language = user.language
    }
}