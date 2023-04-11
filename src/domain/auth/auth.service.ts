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
        
        const admin = await this.userService.getUserByEmail(adminLoginInput.email); //Get user by email

        if (admin && adminLoginInput.password == admin.password  && admin.isAdmin)  { //Check if found, id password matches and if user is admin
            return admin
        }
        return null;
    }

    async isAdmin(userId: number): Promise<boolean | null>{
        const user = await this.userService.getUserById(userId); //Get user by id

        if(user){ //If found
            if(user.isAdmin) return true; // If user is admin return true

            else return false // If not admin return false
        }

        return null; //If not found return null
    }
}