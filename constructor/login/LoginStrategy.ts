import { Login } from "../../module/login";
import { LoginBuilder } from "./LoginBuilder";

export interface LoginStrategy{
    create(): Login;
}

export class ValidLoginStrategy implements LoginStrategy{
    create(): Login {
        return new LoginBuilder()
            .withEmail("prem@yopmail.com")
            .withPassword("Automation@2026")
            .build();
    }
}

export class InvalidLoginStrategy implements LoginStrategy{
    create(): Login {
        return new LoginBuilder()
            .withEmail("wrongEmail@yopmail.com")
            .withPassword("wrongPassword")
            .build();
    }
}