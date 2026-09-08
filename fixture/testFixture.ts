import { test as base, Page, request } from "@playwright/test";
import { Login } from "../module/login";
import { AuthClient } from "../api/AuthClient";
import { ApiFactory } from "../api/apiFactory";
import { LoginPage } from "../pages/loginPage";
import { LoginFactory } from "../constructor/login/LoginFactory";
import { envConfig } from "../config/config";

type ApiFixture = {
    token: string;
    api: ApiFactory;
    page: Page
}

// const BASE_URL = "https://api.eventhub.rahulshettyacademy.com";
// const UI_BASE_URL = process.env.BASE_URL;
export const test = base.extend<ApiFixture>({

    token: async({request}, use)=>{
        
        const endpoint = `${envConfig.apiBaseURL}/api/auth/login`;
        const loginData = LoginFactory.create('valid');
        const login = new AuthClient(request, endpoint);
        const token = await login.login(loginData.email, loginData.password);
        await use(token);
    },
    api: async({request, token}, use)=>{
        const api = new ApiFactory(request, token);
        await use(api);
    },
    page: async({page},use)=>{

        const loginData = LoginFactory.create('valid');
        const login = new LoginPage(page);
        await login.goto(`/login`)
        await login.login(loginData);

        await use(page);
    }
})