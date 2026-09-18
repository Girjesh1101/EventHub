import { Locator, Page } from "@playwright/test";
import { Login } from "../module/login";
import { Logger } from "../utils/logger";
import { reportStep } from "../utils/allureReports";

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

    async goto(url?: string):Promise<void>{
        const targetUrl = url || "/login";
        await reportStep(`Navigate to login page: ${targetUrl}`, async ()=>{
            Logger.info(`Navigating to login page: ${targetUrl}`);
            await this.page.goto(targetUrl);
            await this.emailInput.waitFor({state: "visible"});
        });
    }

    async enterEmail(email: string):Promise<void>{
        await reportStep(`Enter Email ${email}`, async ()=>{
            Logger.info(`Entering email: ${email}`);
            await this.emailInput.fill(email);
        });
    }

    async enterPassword(password: string):Promise<void>{
        await reportStep(`Enter Password`, async()=>{
            Logger.info("Entering password for user login");
            await this.passwordInput.fill(password);
        });
    }

    async clickSignIn():Promise<void>{
        await reportStep('Click Sign In button', async ()=>{
            Logger.info("Clicking Sign In button");
            await this.signInButton.click();
        });
    }

    async clickRegisterLink():Promise<void>{
        Logger.info("Clicking Register link");
        await this.registerLink.click();
    }

    async verifyEmail():Promise<string>{
        return await reportStep('Verify logged-in email', async ()=>{
            Logger.info("Waiting for logged-in email label");
            await this.email_Label.waitFor({state: "visible"});
            const email = await this.email_Label.innerText();
            Logger.info(`Verified email: ${email}`);
            return email;
        });
    }


    async login(loginDetails : Login):Promise<void>{
        await reportStep(`Login as ${loginDetails.email}`, async ()=>{
            Logger.info(`Logging in user: ${loginDetails.email}`);
            await this.enterEmail(loginDetails.email);
            await this.enterPassword(loginDetails.password);
            await this.clickSignIn();
        });
    }

}