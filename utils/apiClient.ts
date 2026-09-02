import { APIRequestContext } from "@playwright/test";

export class ApiClient {

    constructor(private api: APIRequestContext,  private baseUrl: string, private token: string) {}

    getHeader(){
        return {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
        }
    }

    async get(endpoint: string){
        return await this.api.get(`${this.baseUrl}${endpoint}`, {
            headers: this.getHeader()
        })
    }

    async post(endpoint:string, payload?: unknown){
        return await this.api.post(`${this.baseUrl}${endpoint}`, {
            headers: this.getHeader(),
            data: payload
        })
    }

    async delete(endpoint:string){
        return await this.api.delete(`${this.baseUrl}${endpoint}`, {
            headers: this.getHeader()
        })
    }
}