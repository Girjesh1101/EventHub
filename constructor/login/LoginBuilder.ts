import { Login } from "../../module/login";

export class LoginBuilder {

    private loginDetails: Login = {
        email: "",
        password: ""
    }

    withEmail(email:string){
        this.loginDetails.email = email;
        return this;
    }

    withPassword(password:string){
        this.loginDetails.password = password;
        return this;
    }

    build(): Login{
        return this.loginDetails;
    }
}