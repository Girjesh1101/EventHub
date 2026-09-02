import { test as base, request } from "@playwright/test";
import { Login } from "../module/login";
import { AuthClient } from "../api/AuthClient";
import { ApiFactory } from "../api/apiFactory";

type ApiFixture = {
    token: string,
    api: ApiFactory
}

const BASE_URL = "https://api.eventhub.rahulshettyacademy.com";
export const test = base.extend<ApiFixture>({

    token: async({request}, use)=>{
        
        const endpoint = `${BASE_URL}/api/auth/login`;
        const loginData : Login = {
            email: "prem@yopmail.com",
            password: "Automation@2026"
        };

        const login = new AuthClient(request, endpoint);
        const token = await login.login(loginData.email, loginData.password);
        await use(token);
    },
    api: async({request, token}, use)=>{
        const api = new ApiFactory(request, BASE_URL, token);
        await use(api);
    }
})