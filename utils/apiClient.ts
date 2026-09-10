import { APIRequestContext } from "@playwright/test";
import { envConfig } from "../config/config";
import { Logger } from "./logger";

export class ApiClient {

    constructor(private api: APIRequestContext,private token: string) {}

    getHeader(){
        return {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
        }
    }

    async get(endpoint: string){
        const url = `${envConfig.apiBaseURL}${endpoint}`;
        Logger.info(`API GET -> ${url}`);
        const response = await this.api.get(url, {
            headers: this.getHeader()
        });
        return response;
    }

    async post(endpoint:string, payload?: unknown){
        const url = `${envConfig.apiBaseURL}${endpoint}`;
        Logger.info(`API POST -> ${url}`);
        Logger.debug(`Payload: ${JSON.stringify(payload)}`);
        const response = await this.api.post(url, {
            headers: this.getHeader(),
            data: payload
        });
        return response;
    }

    async delete(endpoint:string){
        const url = `${envConfig.apiBaseURL}${endpoint}`;
        Logger.info(`API DELETE -> ${url}`);
        const response = await this.api.delete(url, {
            headers: this.getHeader()
        });
        return response;
    }

    async put(endpoint:string, payload?: unknown){
        const url = `${envConfig.apiBaseURL}${endpoint}`;
        Logger.info(`API PUT -> ${url}`);
        Logger.debug(`Payload: ${JSON.stringify(payload)}`);
        const response = await this.api.put(url, {
            headers: this.getHeader(),
            data: payload
        });
        return response;
    }
}