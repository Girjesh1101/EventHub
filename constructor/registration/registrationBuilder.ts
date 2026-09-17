import { Registration } from "../../module/registration";

export class RegistrationBuilder{

    private registrationData : Registration = {
        email : '',
        password : ''
    };


    withEmail(email: string){
        this.registrationData.email = email;
        return this
    }

    withPassword(password: string){
        this.registrationData.password = password;
        return this
    }

    build():Registration{
        return this.registrationData;
    }

}