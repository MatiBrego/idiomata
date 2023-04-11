export class AdminLoginInputDto{
    email: string
    password: string

    constructor(user: AdminLoginInputDto){
        this.email = user.email
        this.password = user.password
    }
}