import jwt from "jwt-simple"
import moment from "moment";
import { UserDto } from "../user/user.dto";
import { UserService } from "../user/user.service";

export class AuthService{

    constructor(private readonly userService: UserService){}

    async loginUser(loginInput: loginInputDto): Promise<UserDto | null>{
        //TODO Should check password 
        return this.userService.getUserByEmail(loginInput.email)
    }

    generateToken(user: UserDto): String{
        console.log(user)
        var payload = {
            sub: user.id,
            iat: moment().unix(),
            exp: moment().add(1, "days").unix(),
          };
          return jwt.encode(payload, "SuperSecretPassword");
    }
}