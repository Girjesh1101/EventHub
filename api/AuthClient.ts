import { APIRequestContext } from "@playwright/test";

export class AuthClient {

    constructor(private api: APIRequestContext, private baseUrl:string){}

    async login(email: string, password:string): Promise<string>{

        const response = await this.api.post(`${this.baseUrl}`, {
            data:{
                email,
                password
            }
        })

        if(!response.ok()){
            throw new Error(`Login failed with status code: ${response.status()}`);
        }
    
        const body = await response.json();
        if(!body.token){
            throw new Error(`Login success but does not contain a token`);
        }
        return body.token;
    }
}