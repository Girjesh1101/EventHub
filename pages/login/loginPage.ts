import { Locator, Page } from "@playwright/test";
import { Login } from "../../module/login";

export class LoginPage {

    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;
    readonly registerLink: Locator;
    readonly email_Label : Locator;

    constructor(page: Page){
        this.page = page;
        this.emailInput = page.getByLabel("Email");
        this.passwordInput = page.getByLabel("Password");
        this.signInButton = page.getByRole("button", {name: "Sign In"});
        this.registerLink = page.getByRole("link", {name: "Register"});
        this.email_Label = page.locator('#user-email-display');
    }

    async goto(url:string):Promise<void>{
        await this.page.goto(url);
        await this.emailInput.waitFor({state: "visible"});
    }

    async enterEmail(email: string):Promise<void>{
        await this.emailInput.fill(email);
    }

    async enterPassword(password: string):Promise<void>{
        await this.passwordInput.fill(password);
    }

    async clickSignIn():Promise<void>{
        await this.signInButton.click();
    }

    async clickRegisterLink():Promise<void>{
        await this.registerLink.click();
    }

    async verifyEmail():Promise<string>{
        await this.email_Label.waitFor({state: "visible"});
        return await this.email_Label.innerText();
    }


    async login(loginDetails : Login):Promise<void>{
        await this.enterEmail(loginDetails.email);
        await this.enterPassword(loginDetails.password);
        await this.clickSignIn();
    }



}