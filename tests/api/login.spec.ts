import test, { expect, request } from "@playwright/test";
import { AuthClient } from "../../api/AuthClient";
import { Login } from "../../module/login";


const BASE_URL ="https://api.eventhub.rahulshettyacademy.com";
let token:string ;

test.describe('Login API Tests', ()=>{


    test.beforeEach('generate token', async({request})=>{

        const endpoint = `${BASE_URL}/api/auth/login`;
        const authClient = new AuthClient(request, endpoint);

        const loginData: Login = {
            email: "prem@yopmail.com",
            password: "Automation@2026"
        }
        token  = await authClient.login(loginData.email, loginData.password);
        expect(token).toBeDefined();
        console.log("token: ", token);
    })

    test('booking API test with token', async({request})=>{
        console.log("successful");
        
    })

})