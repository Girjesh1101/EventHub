import {test , expect} from "@playwright/test";

import { Login } from "../../module/login";
import { LoginFactory } from "../../constructor/login/LoginFactory";
import { LoginPage } from "../../pages/login/loginPage";

const url : string = "https://eventhub.rahulshettyacademy.com/login"
test('Login Test', async({page})=>{

    const loginObj = new LoginPage(page);
    const loginData: Login = LoginFactory.create('valid');
    console.log(loginData);
    
    await loginObj.goto(url);
    await loginObj.login(loginData)
    const verifiedEmail = await loginObj.verifyEmail();
    expect(verifiedEmail).toBe(loginData.email);
})