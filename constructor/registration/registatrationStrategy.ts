import { Registration } from "../../module/registration";
import { RegistrationBuilder } from "./registrationBuilder";

export interface RegistrationStrategy {
    creat() : Registration
}

export class validRegistrationStrategy implements RegistrationStrategy {

    creat(): Registration {
        return new RegistrationBuilder()
            .withEmail('prem@yopmail.com')
            .withPassword('Automation@2026')
            .build();
    }
}