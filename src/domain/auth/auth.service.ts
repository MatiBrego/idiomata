import jwt from "jwt-simple"
import moment from "moment";
import { UserDto } from "../user/user.dto";

export class AuthService{

    async loginUser(loginInput: loginInputDto): Promise<UserDto | null>{
        return null
    }

    generateToken(user: UserDto): String{
        var payload = {
            sub: user.id,
            iat: moment().unix(),
            exp: moment().add(1, "days").unix(),
          };
          return jwt.encode(payload, "SuperSecretPassword");
    }
}