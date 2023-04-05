import jwt from "jwt-simple"
import moment from "moment";
import { UserDto } from "../user/user.dto";
import { UserService } from "../user/user.service";
import { validTokens } from "../../utils/auth";
import { AdminLoginInputDto } from "../admin/admin.dto";

export class AuthService{

    constructor(private readonly userService: UserService){}

    async loginUser(loginInput: loginInputDto): Promise<UserDto | null>{

        const user = await this.userService.getUserByEmail(loginInput.email)
        if (user && loginInput.password == user.password)  {
            return user
        }
        return null;
    }

    generateToken(user: UserDto): String{
        var payload = {
            sub: user.id,
            iat: moment().unix(),
            exp: moment().add(1, "days").unix(),
        };
        const token = jwt.encode(payload, "SuperSecretPassword");
        validTokens.add(token) //Add token to token list
        return token;
    }

    async loginAdmin(adminLoginInput: AdminLoginInputDto): Promise<UserDto | null>{
        
        const admin = await this.userService.getAdminByEmail(adminLoginInput.email);

        if (admin && adminLoginInput.password == admin.password)  {
            return admin
        }
        return null;
    }
}