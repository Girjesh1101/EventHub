import { Registration } from "../../module/registration";
import { validRegistrationStrategy } from "./registatrationStrategy";

export class RegistrationFactory {

    static create(registration: string):Registration{

        if(registration === 'validRegistration'){
            return new validRegistrationStrategy().creat();
        }else{
            throw new Error(`Invalid Registration type : ${registration}`)
        }
    }
    
}