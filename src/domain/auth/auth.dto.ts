class loginInputDto{
    email: string
    password: string

    constructor(input: loginInputDto){
        this.email = input.email
        this.password = input.password
    }
}