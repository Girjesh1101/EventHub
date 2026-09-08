import { APIRequestContext } from "@playwright/test";
import { envConfig } from "../config/config";

export class ApiClient {

    constructor(private api: APIRequestContext,private token: string) {}

    getHeader(){
        return {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
        }
    }

    async get(endpoint: string){
        return await this.api.get(`${envConfig.apiBaseURL}${endpoint}`, {
            headers: this.getHeader()
        })
    }

    async post(endpoint:string, payload?: unknown){
        return await this.api.post(`${envConfig.apiBaseURL}${endpoint}`, {
            headers: this.getHeader(),
            data: payload
        })
    }

    async delete(endpoint:string){
        return await this.api.delete(`${envConfig.apiBaseURL}${endpoint}`, {
            headers: this.getHeader()
        })
    }
}