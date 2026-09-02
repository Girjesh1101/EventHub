import { Login } from "../../module/login";
import { InvalidLoginStrategy, LoginStrategy, ValidLoginStrategy,  } from "./LoginStrategy";

export class LoginFactory{

    static create(loginType:string):Login{

        if(loginType === "valid"){
            return new ValidLoginStrategy().create();
        }
        else if(loginType === "invalid"){
            return new InvalidLoginStrategy().create();
        }
        else{
            throw new Error(`Invalid login type: ${loginType}`);
        }
    }
}