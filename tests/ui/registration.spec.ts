import test from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import { envConfig } from "../../config/config";
import { RegistrationPage } from "../../pages/registrationPage";
import { Registration } from "../../module/registration";
import { Assertion } from "../../utils/genericAssertions";
import { RegistrationFactory } from "../../constructor/registration/registrationFactory";


test('@regression registration test', async ({page})=>{

    const login = new LoginPage(page);
    await login.goto(envConfig.baseURL);

    const registation = new RegistrationPage(page);
    await registation.clickRegistration();

    const registrationData : Registration = RegistrationFactory.create('validRegistration');
    await registation.enterRegistrationDetails(registrationData);
    const verifiedEmail = await login.verifyEmail();
    Assertion.verifyText(verifiedEmail, registrationData.email);

})