import { Locator, Page } from "@playwright/test";
import { Registration } from "../module/registration";
import { Logger } from "../utils/logger";
import { reportStep } from "../utils/allureReports";

export class RegistrationPage {

    readonly page: Page;
    readonly registrationBtn : Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput : Locator;
    readonly createAccountBtn : Locator;


    constructor(page : Page){
        this.page = page;
        this.registrationBtn = page.getByRole('link', {name: 'Register'});
        this.emailInput = page.locator('#register-email');
        this.passwordInput = page.locator('#register-password');
        this.confirmPasswordInput = page.getByPlaceholder('Repeat your password');
        this.createAccountBtn = page.getByRole('button', {name: 'Create Account'});
    }

    async clickRegistration():Promise<void>{
        await reportStep('Click Register button', async ()=>{
            Logger.info('Click on Registration button');
            await this.registrationBtn.click();
        });
    }

    async enterEmail(email: string):Promise<void>{
        await reportStep(`Enter registration email`, async ()=>{
            Logger.info(`Enter Email -> ${email}`);
            await this.emailInput.fill(email);
        });
    }

    async enterPassword(password : string):Promise<void>{
        await reportStep('Enter password', async ()=>{
            Logger.info(`Enter Email -> ${password}`);
            if(password.length >= 8){
                if(/[A-Z]/.test(password) && /[a-z]/.test(password) && /[\W_]/.test(password)){
                    await this.passwordInput.fill(password);
                }
            }else{
                throw Error(`Password must include at least one uppercase and lower letter and special charactor.`);
            }
        });
    }

    async enterConfirmPasssword(confirmPassword: string):Promise<void>{
        await reportStep('Confirm password', async ()=>{
            Logger.info(`Enter Email -> ${confirmPassword}`);
            if(confirmPassword.length >= 8){
                if(/[A-Z]/.test(confirmPassword) && /[a-z]/.test(confirmPassword) && /[\W_]/.test(confirmPassword)){
                    await this.confirmPasswordInput.fill(confirmPassword);
                }
            }else{
                throw Error(`Password must include at least one uppercase and lower letter and special charactor.`);
            }
        });
    }

    async clickCreateAccount():Promise<void>{
        await reportStep('Create account', async ()=>{
            await this.createAccountBtn.click();
        });
    }


    async enterRegistrationDetails(registrationDetails : Registration):Promise<void>{
        await reportStep('Complete registration form', async ()=>{
            await this.enterEmail(registrationDetails.email);
            await this.enterPassword(registrationDetails.password);
            await this.enterConfirmPasssword(registrationDetails.password);
            await this.clickCreateAccount();
        });
    }

}