import { test as base, Page, request } from "@playwright/test";
import { Login } from "../module/login";
import { AuthClient } from "../api/AuthClient";
import { ApiFactory } from "../api/apiFactory";
import { LoginPage } from "../pages/loginPage";
import { LoginFactory } from "../constructor/login/LoginFactory";

type ApiFixture = {
    token: string;
    api: ApiFactory;
    page: Page
}

const BASE_URL = "https://api.eventhub.rahulshettyacademy.com";
const UI_BASE_URL ='https://eventhub.rahulshettyacademy.com/login';
export const test = base.extend<ApiFixture>({

    token: async({request}, use)=>{
        
        const endpoint = `${BASE_URL}/api/auth/login`;
        // const loginData : Login = {
        //     email: "prem@yopmail.com",
        //     password: "Automation@2026"
        // };
        const loginData = LoginFactory.create('valid');
        const login = new AuthClient(request, endpoint);
        const token = await login.login(loginData.email, loginData.password);
        await use(token);
    },
    api: async({request, token}, use)=>{
        const api = new ApiFactory(request, BASE_URL, token);
        await use(api);
    },
    page: async({page},use)=>{

        const loginData = LoginFactory.create('valid');
        const login = new LoginPage(page);
        await login.goto(`${UI_BASE_URL}/`)
        await login.login(loginData);

        await use(page);
    }
})